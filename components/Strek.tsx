import { View, Text, StyleSheet } from "react-native";
import colors from "@/constants/colors";

export interface StrekData {
  id: string;
  name: string;
  time: string;
  notifications: boolean;
  days: string[];
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface StrekProps {
  data: StrekData;
}

export default function Strek({ data }: StrekProps) {
  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.time}>{data.time}</Text>
      </View>

      <View style={s.bottomRow}>
        <View style={s.days}>
          {DAY_LABELS.map((day) => {
            const active = data.days.includes(day);
            return (
              <Text
                key={day}
                style={[s.day, active ? s.dayActive : s.dayInactive]}
              >
                {day}
              </Text>
            );
          })}
        </View>
        {data.notifications && (
          <Text style={s.notif}>notifications on</Text>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "SpaceMonoBold",
    fontSize: 18,
    color: colors.text,
  },
  time: {
    fontFamily: "SpaceMono",
    fontSize: 14,
    color: colors.text2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  days: {
    flexDirection: "row",
    gap: 6,
  },
  day: {
    fontFamily: "SpaceMono",
    fontSize: 12,
  },
  dayActive: {
    color: colors.text,
  },
  dayInactive: {
    color: colors.text2,
    opacity: 0.4,
  },
  notif: {
    fontFamily: "SpaceMono",
    fontSize: 11,
    color: colors.text2,
  },
});
