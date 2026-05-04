import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Button from "../../components/Button";
import colors from "../../constants/colors";
import AddModal from "@/components/AddModal";
import Strek from "@/components/Strek";
import type { StrekData } from "@/components/Strek";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const [addOpen, setAddOpen] = useState(false);
  const [streks, setStreks] = useState<StrekData[]>([]);
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStrek = (strek: StrekData) => {
    setStreks((prev) => [strek, ...prev]);
  };

  return (
    <View style={s.container}>
      <View style={s.head}>
        <Text style={s.title}>{user?.displayName}&apos;s Streks</Text>
        <Button onPress={handleSignOut} icon="logout" />
      </View>

      <FlatList
        data={streks}
        renderItem={({ item }) => <Strek data={item} />}
        keyExtractor={(item) => item.id}
        style={s.list}
        contentContainerStyle={s.listContent}
        ListEmptyComponent={
          <Text style={s.emptyText}>No streks yet. Add one!</Text>
        }
      />

      <Button
        onPress={() => setAddOpen(true)}
        icon="plus"
        size={52}
        iconSize={20}
        style={s.addBtn}
      />

      <AddModal
        visible={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddStrek}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    color: colors.text,
    fontFamily: "SpaceMonoBold",
    fontSize: 24,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.text2,
    fontFamily: "SpaceMono",
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
