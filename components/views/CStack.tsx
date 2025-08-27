import React, { Children, ReactElement, ReactNode, isValidElement } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

// Common props shared by all stacks
export type CStackProps = ViewProps & {
  children?: ReactNode;
  // Space between children
  gap?: number;
  // Alignment/Justification (maps to alignItems/justifyContent)
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  // Flex wrap and flex growth
  wrap?: ViewStyle['flexWrap'];
  flex?: ViewStyle['flex'];
  // Reverse the stack direction (row-reverse / column-reverse)
  reverse?: boolean;
  // Shorthand to center both axes (overridden by explicit align/justify)
  center?: boolean;
  // When true, add a subtle border to visualize layout during development
  debug?: boolean;
  style?: StyleProp<ViewStyle>;
};

function applyGapToChildren(
  children: ReactNode,
  gap: number | undefined,
  orientation: 'horizontal' | 'vertical',
  reverse?: boolean
): ReactNode {
  if (!gap || gap <= 0) return children;

  const childArray = Children.toArray(children);
  const isHorizontal = orientation === 'horizontal';

  return childArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    const isLast = index === childArray.length - 1;
    const marginStyle: ViewStyle = {};

    if (!isLast) {
      if (isHorizontal) {
        if (reverse) marginStyle.marginLeft = gap;
        else marginStyle.marginRight = gap;
      } else {
        if (reverse) marginStyle.marginTop = gap;
        else marginStyle.marginBottom = gap;
      }
    }

    const existingStyle = (child.props as any).style as StyleProp<ViewStyle> | undefined;
    const nextStyle: StyleProp<ViewStyle> = existingStyle
      ? [existingStyle, marginStyle]
      : marginStyle;

    return React.cloneElement(child as ReactElement<any>, { style: nextStyle });
  });
}

function buildBaseStyle(
  options: Pick<CStackProps, 'align' | 'justify' | 'wrap' | 'flex' | 'center' | 'debug' | 'style'>,
  flexDirection: ViewStyle['flexDirection']
): StyleProp<ViewStyle> {
  const { align, justify, wrap, flex, center, debug, style } = options;
  const base: ViewStyle = {
    display: 'flex',
    flexDirection,
    alignItems: center && !align ? 'center' : align,
    justifyContent: center && !justify ? 'center' : justify,
    flexWrap: wrap,
    flex,
    ...(debug ? { borderWidth: 1, borderColor: '#ff99aa' } : null),
  };

  return style ? [base, style] : base;
}

// CXStack: horizontal
export function CXStack(props: CStackProps) {
  const { children, gap, reverse, align, justify, wrap, flex, center, debug, style, ...viewProps } = props;

  const direction: ViewStyle['flexDirection'] = reverse ? 'row-reverse' : 'row';
  const content = applyGapToChildren(children, gap, 'horizontal', reverse);
  const containerStyle = buildBaseStyle({ align, justify, wrap, flex, center, debug, style }, direction);

  return (
    <View {...viewProps} style={containerStyle}>
      {content}
    </View>
  );
}

// CYStack: vertical
export function CYStack(props: CStackProps) {
  const { children, gap, reverse, align, justify, wrap, flex, center, debug, style, ...viewProps } = props;

  const direction: ViewStyle['flexDirection'] = reverse ? 'column-reverse' : 'column';
  const content = applyGapToChildren(children, gap, 'vertical', reverse);
  const containerStyle = buildBaseStyle({ align, justify, wrap, flex, center, debug, style }, direction);

  return (
    <View {...viewProps} style={containerStyle}>
      {content}
    </View>
  );
}

// CZStack: overlay
export type CZStackProps = Omit<CStackProps, 'gap' | 'wrap' | 'reverse'> & {
  // Whether each child should fill the container (default true)
  fillChildren?: boolean;
};

export function CZStack(props: CZStackProps) {
  const { children, center, align, justify, fillChildren = true, debug, style, ...viewProps } = props;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      position: 'relative',
      alignItems: center && !align ? 'center' : align,
      justifyContent: center && !justify ? 'center' : justify,
      ...(debug ? { borderWidth: 1, borderColor: '#99aaff' } : null),
    },
    style,
  ];

  const layered = Children.toArray(children).map((child, i) => {
    if (!isValidElement(child)) return child;
    if (!fillChildren) return React.cloneElement(child, { key: (child as any).key ?? i });

    return (
      <View key={i} pointerEvents={(child.props as any)?.pointerEvents} style={StyleSheet.absoluteFill}>
        {child}
      </View>
    );
  });

  return (
    <View {...viewProps} style={containerStyle}>
      {fillChildren ? layered : children}
    </View>
  );
}

export default CXStack;
