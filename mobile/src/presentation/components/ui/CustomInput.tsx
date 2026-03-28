import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { KeyboardTypeOptions } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { colors } from "../../../config/theme/theme";

type InputMode = "flat" | "outlined";
type IconPosition = "left" | "right";

interface Props {
    label?: string;
    mode?: InputMode;
    keyboardType?: KeyboardTypeOptions;
    textColor?: string;
    value?: string;
    outlineColor?: string;
    maxLength?: number;
    icon?: IconSource;
    iconPosition?: IconPosition;
    style?: any;

    isEditable?: boolean;
    hasError?: boolean;
    isMultiline?: boolean;
    isSecure?: boolean;

    onTextChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const CustomInput = ({
    label,
    mode = "outlined",
    keyboardType = "default",
    textColor = "#000",
    value,
    outlineColor = colors.primary,
    maxLength,
    icon,
    iconPosition = "left",
    style,

    isEditable = true,
    hasError = false,
    isMultiline = false,
    isSecure = false,

    onTextChange,
    onFocus,
    onBlur
}: Props) => {
    const [secure, setSecure] = useState(isSecure);
    const [isFocused, setIsFocused] = useState(false);

    const renderIcon = (icon?: IconSource) =>
        icon ? <TextInput.Icon icon={icon} /> : undefined;

    const renderPasswordIcon = () => (
        <TextInput.Icon
            icon={secure ? "eye-off" : "eye"}
            onPress={() => setSecure(!secure)}
            forceTextInputFocus={false}
        />
    );

    return (
        <TextInput
            label={label}
            mode={mode}
            value={value}
            style={style}
            multiline={isMultiline}
            editable={isEditable}
            error={hasError}
            maxLength={maxLength}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            textColor={textColor}
            outlineColor={outlineColor}
            activeOutlineColor={hasError ? "#B00020" : isFocused ? colors.primary : outlineColor}
            left={
                !isSecure && iconPosition === "left"
                    ? renderIcon(icon)
                    : undefined
            }
            right={
                isSecure
                    ? renderPasswordIcon()
                    : iconPosition === "right"
                        ? renderIcon(icon)
                        : undefined
            }
            onChangeText={onTextChange}
            onFocus={() => {
                setIsFocused(true);
                onFocus?.();
            }}
            onBlur={() => {
                setIsFocused(false);
                onBlur?.();
            }}
        />
    );
};
