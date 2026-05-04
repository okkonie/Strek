import colors from "@/constants/colors";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Switch,
  TouchableOpacity,
} from "react-native";
import Button from "./Button";
import TimePicker from "./TimePicker";
import { useState } from "react";
import type { StrekData } from "./Strek";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type AddModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (strek: StrekData) => void;
};

export default function AddModal({ visible, onClose, onAdd }: AddModalProps) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [days, setDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const reset = () => {
    setName("");
    setTime("");
    setNotifications(false);
    setDays([]);
  };

  const handleAdd = () => {
    if (!name.trim() || !time.trim() || days.length === 0) return;

    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      time,
      notifications,
      days,
    });

    reset();
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={s.container} onPress={onClose}>
        <View style={s.content} onStartShouldSetResponder={() => true}>
          {/* Header */}
          <View style={s.head}>
            <Text style={s.title}>New Strek!</Text>
            <Button icon="close" iconSize={16} onPress={onClose} />
          </View>

          {/* Name */}
          <TextInput
            style={s.input}
            placeholder="Strek name"
            placeholderTextColor={colors.text2}
            cursorColor={colors.text}
            value={name}
            onChangeText={setName}
          />

          {/* Time */}
          <TimePicker value={time} onChangeText={setTime} />

          {/* Notifications */}
          <View style={s.row}>
            <Text style={s.label}>Notifications:</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.primary, true: colors.text2 }}
              thumbColor={notifications ? colors.text : colors.text2}
            />
          </View>

          {/* Day picker */}
          <View style={s.section}>
            <Text style={s.label}>Days:</Text>
            <View style={s.dayRow}>
              {DAY_LABELS.map((day) => {
                const active = days.includes(day);
                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => toggleDay(day)}
                    style={[s.dayBtn, active && s.dayBtnActive]}
                    activeOpacity={0.7}
                  >
                    <Text style={[s.dayText, active && s.dayTextActive]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[
              s.addBtn,
              (!name.trim() || !time.trim() || days.length === 0) &&
                s.addBtnDisabled,
            ]}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text style={s.addBtnText}>Add Strek</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    borderTopEndRadius: 44,
    borderTopStartRadius: 44,
    backgroundColor: colors.secondary,
    paddingHorizontal: 22,
    paddingBottom: 40,
    gap: 16,
  },
  head: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "SpaceMonoBold",
  },
  input: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    fontFamily: "SpaceMono",
    height: 52,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    color: colors.text,
  },
  section: {
    gap: 12,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  dayBtnActive: {
    backgroundColor: colors.text,
  },
  dayText: {
    fontFamily: "SpaceMono",
    fontSize: 12,
    color: colors.text2,
  },
  dayTextActive: {
    color: colors.background,
  },
  addBtn: {
    backgroundColor: colors.text,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addBtnDisabled: {
    opacity: 0.3,
  },
  addBtnText: {
    fontFamily: "SpaceMonoBold",
    fontSize: 16,
    color: colors.background,
  },
});
