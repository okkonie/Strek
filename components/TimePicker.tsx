import { StyleSheet, View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import colors from "@/constants/colors";
import { useState } from "react";
import { TimerPicker } from "react-native-timer-picker";

type TimeDraft = {
  hours: number;
  minutes: number;
};

const formatTime = ({ hours, minutes }: TimeDraft) => {
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const parseTime = (value: string): TimeDraft => {
  const [hoursString = "0", minutesString = "0"] = value.split(":");
  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  return {
    hours: Number.isFinite(hours) ? Math.max(0, Math.min(23, hours)) : 0,
    minutes: Number.isFinite(minutes) ? Math.max(0, Math.min(59, minutes)) : 0,
  };
};

export default function TimePicker(){
  const [time, setTime] = useState("00:00");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [draftTime, setDraftTime] = useState<TimeDraft>({ hours: 0, minutes: 0 });

  const openPicker = () => {
    setDraftTime(parseTime(time));
    setPickerVisible(true);
  };

  const cancelPicker = () => {
    setPickerVisible(false);
  };

  const confirmPicker = () => {
    setTime(formatTime(draftTime));
    setPickerVisible(false);
  };
  
  return (
    <>
      <View style={s.container}>
        <Text style={s.title}>Time:</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={openPicker} style={s.btn}>
          <Text style={s.btnText}>{time}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={pickerVisible} onRequestClose={() => setPickerVisible(false)} animationType="fade" transparent>
        <Pressable style={s.pickerContainer} onPress={cancelPicker} >
          <View style={s.picker} onStartShouldSetResponder={() => true}>
            <TimerPicker
              hideSeconds
              padHoursWithZero
              padMinutesWithZero
              initialValue={{
                hours: draftTime.hours,
                minutes: draftTime.minutes,
                seconds: 0,
              }}
              hourLabel="hours"
              
              minuteLabel="minutes"
              onDurationChange={({ hours, minutes }) => {
                setDraftTime({
                  hours,
                  minutes,
                });
              }}
              styles={{
                theme: "dark",
                backgroundColor: colors.secondary,
                pickerColumnWidth: 150,
                text: {
                  color: colors.text,
                  fontFamily: 'SpaceMono',
                  fontWeight: 'normal',
                },
                pickerItem: {
                  color: colors.text2,
                  fontFamily: 'SpaceMono',
                  fontWeight: 'normal',
                },
                selectedPickerItem: {
                  color: colors.text,
                  fontFamily: 'SpaceMono',
                  fontWeight: 'normal',
                },
                pickerLabel: {
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: 'SpaceMono',
                  fontWeight: 'normal',
                },
              }}
            />
            <View style={s.actions}>
              <TouchableOpacity style={s.actionBtn} onPress={cancelPicker}>
                <Text style={s.actionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.actionBtn, s.confirmBtn]} onPress={confirmPicker}>
                <Text style={s.actionText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    color: colors.text,
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  btn: {
    borderRadius: 16,
    backgroundColor: colors.primary,
    width: 110,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.text,
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)'
  },
  picker: {
    width: '95%',
    backgroundColor: colors.secondary,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 24,
  },
  actionBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtn: {
    backgroundColor: colors.primary,
  },
  actionText: {
    color: colors.text,
    fontFamily: 'SpaceMonoBold',
    fontSize: 15,
  },
})