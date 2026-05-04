import { StyleSheet, View, Text, TextInput } from "react-native";
import colors from "@/constants/colors";

interface TimePickerProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function TimePicker({ value, onChangeText }: TimePickerProps) {
  const handleChange = (text: string) => {
    // Allow only digits and colon, auto-format to HH:MM
    const digits = text.replace(/[^0-9]/g, "");

    if (digits.length <= 2) {
      onChangeText(digits);
    } else if (digits.length <= 4) {
      onChangeText(`${digits.slice(0, 2)}:${digits.slice(2)}`);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.label}>Time:</Text>
      <TextInput
        style={s.input}
        value={value}
        onChangeText={handleChange}
        placeholder="HH:MM"
        placeholderTextColor={colors.text2}
        cursorColor={colors.text}
        keyboardType="number-pad"
        maxLength={5}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  label: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    color: colors.text,
  },
  input: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    fontFamily: "SpaceMono",
    height: 52,
    color: colors.text,
  },
});
