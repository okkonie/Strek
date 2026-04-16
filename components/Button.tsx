import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";
import React from 'react';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({ title, loading, icon, style, ...rest }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[s.button, style]} activeOpacity={0.8} disabled={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <View style={s.contentContainer}>
          {icon && <View style={s.iconContainer}>{icon}</View>}
          <Text style={s.text}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
