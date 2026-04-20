import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext } from "react";

type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

type AuthProviderProps = {
  user: FirebaseAuthTypes.User | null;
  children: ReactNode;
};

export function AuthProvider({ user, children }: AuthProviderProps) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}