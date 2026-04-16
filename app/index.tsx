import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import colors from "../constants/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

GoogleSignin.configure({
  webClientId: '456320109785-uul0ab90iherg5pe4c02kod3dni1o3lu.apps.googleusercontent.com',
});

export default function Index() {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      if (response.data) {
        const googleCredential = GoogleAuthProvider.credential(response.data.idToken);
        await signInWithCredential(getAuth(), googleCredential);
      } else {
        throw new Error("No idToken returned.");
      }
    } catch(e: any) {
      if (e.code === 'SIGN_IN_CANCELLED') {
         // Optionally handle cancellation
      } else {
         alert("Google Sign-In failed: " + e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Log in with Google</Text>
      <Button 
        title="Continue with Google" 
        onPress={() => signInWithGoogle()} 
        loading={loading}
        icon={<FontAwesome6 name="google" size={18} color={colors.text} />}
      />
    </View>
  );
}


const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 24,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: colors.text
  }
})