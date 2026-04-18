
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react"
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Button from "../../components/Button";
import colors from "../../constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
        <Button onPress={handleSignOut} loading={false} style={{borderRadius: 999}}>
          <FontAwesome6 name="arrow-right-from-bracket" size={16} color={colors.text}/>
        </Button>
      </View>

      <Button onPress={() => setAddOpen(true)} loading={false} style={{borderRadius: 999}}>
        <FontAwesome6 name="plus" size={16} color={colors.text}/>
      </Button>

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
  list: {
    flex: 1,
  }
});