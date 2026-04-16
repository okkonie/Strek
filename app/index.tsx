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
      
      if (response.type === 'success') {
        if (response.data?.idToken) {
          const googleCredential = GoogleAuthProvider.credential(response.data.idToken);
          await signInWithCredential(getAuth(), googleCredential);
        } else {
          throw new Error("No idToken returned.");
        }
      } else if (response.type === 'cancelled') {
        console.log("User cancelled Google Sign-in");
      }
    } catch(e: any) {
      alert("Google Sign-In failed: " + e.message);
      console.log(e.code)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.container}>
      <View>
        <Text style={s.title}>Log in</Text>
        <Text style={s.title}>via Google</Text>
      </View>
      <View style={s.btnContainer}> 
        <Button 
          onPress={() => signInWithGoogle()} 
          loading={loading}
          style={{borderRadius: 99}}
        >
          <FontAwesome6 name="google" size={20} color={colors.text} />
        </Button>
      </View>
    </View>
  );
}


const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 32,
    gap: 42,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontFamily: 'SpaceMonoBold'
  },
  btnContainer: {
    alignItems: 'flex-end'
  }
})