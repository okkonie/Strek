import { Stack, useSegments, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'SpaceMonoBold': require('../assets/fonts/SpaceMono-Bold.ttf')
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
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
  }, [user, initializing, segments, router])

  useEffect(() => {
    if (fontsLoaded || fontError || !initializing) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, initializing]);

  if ((!fontsLoaded && !fontError) || initializing) {
    return null;
  }

  return (
    <AuthProvider user={user}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      </Stack>
    </AuthProvider>
  )
}
