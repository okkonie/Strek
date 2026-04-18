import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors" 

export default function Streak(name: string){
  return (
    <View style={s.container}>
      <Text style={s.title}>{name}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SpaceMonoBold',
    color: colors.text
  }
})