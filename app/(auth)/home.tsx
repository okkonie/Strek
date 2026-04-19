
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react"
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from "../../components/Button";
import colors from "../../constants/colors";
import AddModal from "@/components/AddModal";


export default function Page(){
  const [addOpen, setAddOpen] = useState(false);

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
        <Text style={s.title}>Your Streks</Text>
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
  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  list: {
    flex: 1,
  }
});