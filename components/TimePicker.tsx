import { StyleSheet, View, Text, ScrollView } from "react-native";
import colors from "@/constants/colors";
import { useState } from "react";

const BLOCK = 50;

export default function TimePicker() {
  const hourValues: string[] = []; 
  for (let i = 0; i < 24; i++) hourValues.push(i.toString().padStart(2, "0"));


  const minValues: string[] = []; 
  for(let j = 0; j < 60; j++) minValues.push(j.toString().padStart(2, "0"));

  const TimeScroll = ({ values }: { values: string[] }) => {
    return (
      <ScrollView style={s.scroll} pagingEnabled>
        {values.map((x) => 
          <Text style={{height: BLOCK, width: '100%', textAlign: 'center', justifyContent: 'center'}}>{x}</Text>
        )}
      </ScrollView>
    )
  } 

  return (
    <View style={s.container}>
      <Text style={s.title}>Time:</Text>
      <View style={s.pickerContainer}>
        <TimeScroll values={hourValues} />
        <TimeScroll values={minValues} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: colors.text
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    height: BLOCK * 3
  },
  scroll: {
    width: 'auto',
    height: '100%',
  }
});