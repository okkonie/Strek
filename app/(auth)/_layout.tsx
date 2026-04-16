import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "@/constants/colors"

export default function Layout(){
  return ( 
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen name="home" options={{headerShown: false}}/>
      </Stack>
    </SafeAreaView>
  )
}