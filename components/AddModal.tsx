import colors from "@/constants/colors";
import { Modal, View, StyleSheet, Text } from "react-native";
import Button from "./Button";

type AddModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddModal({ visible, onClose }: AddModalProps) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={s.container}>
        <View style={s.content}>
          <View style={s.head}>
            <Text style={s.title}>New Strek!</Text>
            <Button />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  content: {
    flex: 1,
    maxHeight: '80%',
    borderTopEndRadius: 44,
    borderTopStartRadius: 44,
    backgroundColor: colors.secondary
  },
  head: {
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    color: colors.text
  }
});