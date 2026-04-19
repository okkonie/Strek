import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import React from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";

type AntDesignIconName = NonNullable<React.ComponentProps<typeof AntDesign>["name"]>;

interface CustomButtonProps extends TouchableOpacityProps {
  icon: AntDesignIconName;
  color?: string;
  size?: number;
  iconSize?: number;
  loading?: boolean;
}

export default function Button(
  { 
    icon, 
    color = colors.primary, 
    size = 44, 
    iconSize = 16, 
    loading = false, 
    style, 
    children, 
    disabled, 
    ...rest 
  }: CustomButtonProps
) {
  return (
    <TouchableOpacity
      style={[s.button, { backgroundColor: color, width: size, height: size }, style]}
      activeOpacity={0.8}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <AntDesign name={icon} size={iconSize} color={colors.text} />
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  }
});
