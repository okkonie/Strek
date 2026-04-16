import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";
import React from 'react';

interface CustomButtonProps extends TouchableOpacityProps {
  loading?: boolean;
}

export default function Button({ children, loading, style, ...rest }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[s.button, style]} activeOpacity={0.8} disabled={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    padding: 18,
    borderRadius: 12,
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
