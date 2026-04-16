import { View, Text, StyleSheet } from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from "../../components/Button";
import colors from "../../constants/colors";

export default function Page(){
  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome Home!</Text>
      <Button title="Sign out" onPress={handleSignOut} loading={false}/>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    marginBottom: 20,
  }
});