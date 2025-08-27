import { TouchableOpacity, View, Text, StyleProp, ViewStyle, TouchableOpacityProps, useColorScheme } from "react-native";
import { PropsWithChildren } from "react";
import { Colors } from '@/constants/Colors';
import CXStack from "../views/CStack";

interface CButtonProps extends TouchableOpacityProps {
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
    const { style, onPress, disabled, type, buttonText, children, ...rest } = props;
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={style} {...rest}>
            <CXStack style={{
                    backgroundColor: type === 'primary' ? Colors.light.button : type === 'secondary' ? '#6c757d' : '#ffffff',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    borderWidth: type === 'tertiary' ? 1 : 0,
                    borderColor: '#6c757d',
                    width: 'auto'}}
                >
                {props.leftIcon}
                <Text style={{'color': ['primary', 'secondary'].includes(type??'')? '#ffffff': '#000'}} >{buttonText}</Text>
                {children}
                {props.rightIcon}
            </CXStack>
        </TouchableOpacity>
    );
}