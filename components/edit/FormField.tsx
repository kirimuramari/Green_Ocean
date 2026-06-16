import React from "react";
import { Text, View } from "react-native";
import { formStyles } from "@/theme/formStyles";

type Props = {
    label: string;
    children: React.ReactNode;
};
export function FormField({
    label,
    children,
    }:Props) {
    return (
        <View>
        <Text style={formStyles.label}>
            {label}
            </Text>
        {children}
        </View>
    );
}