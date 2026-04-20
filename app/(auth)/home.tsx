
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react"
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from "../../components/Button";
import colors from "../../constants/colors";
import AddModal from "@/components/AddModal";
import Strek from "@/components/Strek";
import { useAuth } from "@/context/AuthContext";


export default function Page(){
  const [addOpen, setAddOpen] = useState(false);
  const { user } = useAuth();

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
      <View style={s.head}>
        <Text style={s.title}>{user?.displayName}'s Streks</Text>
        <Button 
          onPress={handleSignOut} 
          icon="logout"
        />
      </View>

      <Button 
        onPress={() => setAddOpen(true)} 
        icon="plus"
        size={52}
        iconSize={20}
        style={s.addBtn}
      />

      <FlatList 
        data={[]}
        renderItem={() => <Strek/>}
        keyExtractor={(_, index) => index.toString()}
        style={s.list}
      />

      <AddModal visible={addOpen} onClose={() => setAddOpen(false)} />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    color: colors.text,
    fontFamily: 'SpaceMonoBold',
    fontSize: 24,
  },
  subTitle: {
    width: '100%',
    color: colors.text2,
    fontFamily: 'SpaceMono',
    marginBottom: 8,
  },
  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  list: {
    flex: 1,
  }
});