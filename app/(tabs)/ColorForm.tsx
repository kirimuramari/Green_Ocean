import { BackButton } from "@/components/BackButton";
import { ColorFormView } from "@/components/common/ColorFormView";
import { validateColorForm } from "@/features/form/validateColorForm";
import { formStyles } from "@/theme/formStyles";
import {  getSnackbarStyle } from "@/theme/snackbarStyles";
import { useColorForm } from "@/hooks/useColorForm";
import {useSetList} from "@/hooks/useSetList";
import { router } from "expo-router";
import { useNextNumber } from "@/hooks/useNextNumber";
import {useSnackbar} from "@/hooks/useSnackbar";
import { useRegisterColor } from "@/hooks/useRegisterColor";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

const ColorForm = () => {
  const {setList} = useSetList();

const {
  visible:snackbarVisible,
  message:snackbarMessage,
  type:snackbarType,
  showSnackbar,
  hideSnackbar,
} = useSnackbar();
const {
  form,
  handleChange,
  resetForm,
} = useColorForm();

const {nextNumber} = useNextNumber();
const {registerColor} = useRegisterColor();

  const handleRegister = async () => {
    const errorMessage = validateColorForm(form);
    if (errorMessage) {
      showSnackbar(errorMessage, "error");

      return;
    }

    const result = await registerColor(form);

    showSnackbar(
      result.message,
      result.success ? "success" : "error"
    );
    if (result.success) {
      resetForm();
    }
  };
  return (
    <ScrollView>
      <View
        style={(styles.container, formStyles.container)}
      >
        <View style={formStyles.subContainer}>
          <View style={formStyles.header}>
            <BackButton />
            <Text style={formStyles.title}>新規商品登録</Text>
          </View>
          <ColorFormView
            form={form}
            onChange={handleChange}
            setList={setList}
            mode="create"
            readonlyNumber={nextNumber}
            onSubmitEditing={handleRegister}
            
          />
          <View style={formStyles.buttonRow}>
            <TouchableOpacity
              onPress={handleRegister}
              style={formStyles.button}
            >
              <Text style={formStyles.buttonText}>登録する</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={[formStyles.cancelButton, formStyles.halfButton]}
            >
              <Text style={formStyles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={3000}
        style={getSnackbarStyle(snackbarType)}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",

    gap: 12,
  },

  label: {
    color: "#434656",

    fontSize: 16,
  },
  input: {
    color: "#434656",

    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ColorForm;
