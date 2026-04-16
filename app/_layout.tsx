import { Stack, useSegments, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthChanged", user ? user.uid : null);
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    if(initializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if(user && !inAuthGroup){
      router.replace('/(auth)/home');
    } else if(!user && inAuthGroup){
      router.replace('/');
    }
  }, [user, initializing])

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
    </Stack>
  )
}
