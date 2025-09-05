import { Colors } from '@/constants/Colors';
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, Text, useColorScheme, ViewStyle } from "react-native";
import CXStack from "../views/CStack";

interface CButtonProps extends PressableProps {
    onPress?: () => void;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'tertiary';
    buttonText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    // Allow parent containers (e.g., stacks) to pass layout styles like margin for spacing
    style?: StyleProp<ViewStyle>;
}

export default function CButton(props: CButtonProps & PropsWithChildren) {
    // Basic button component with three types: primary, secondary, tertiary
    const { style, onPress, disabled, type, buttonText, children, ...rest } = props;
    return (
        <Pressable onPress={onPress} disabled={disabled} style={style} {...rest}>
            <CXStack style={{
                    backgroundColor: type === 'primary' ? Colors.light.button : type === 'secondary' ? '#6c757d' : Colors.dark.button,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    borderWidth: type === 'tertiary' ? 1 : 0,
                    borderColor: '#6c757d',
                    width: 'auto'}}
                >
                {props.leftIcon}
                <Text style={{'color': ['primary', 'secondary'].includes(type??'')? '#ffffff': '#ffffff'}} >{buttonText}</Text>
                {children}
                {props.rightIcon}
            </CXStack>
        </Pressable>
    );
}