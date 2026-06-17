import { formStyles } from "@/theme/formStyles";
import { TouchableOpacity, View,Text, } from "react-native";

type Props = {
    updating:boolean;
    onUpdate:() => void;
    onCancel:() => void;
};

export function EditButtonRow({
    updating,
    onUpdate,
    onCancel,

}:Props) {
    return (
    <View style={{marginLeft:25}}>

        <View style={formStyles.buttonRow}>
            <TouchableOpacity
                onPress={onUpdate}
                disabled={updating}
                style={formStyles.button}
              >
              <Text style={formStyles.buttonText}>
                {updating ? "更新中..." : "再登録"}
              </Text>
            </TouchableOpacity>
                          <TouchableOpacity
                            onPress={onCancel}
                            style={[formStyles.cancelButton, formStyles.halfButton]}
                          >
                            <Text style={formStyles.cancelButtonText}>キャンセル</Text>
                          </TouchableOpacity>
                        </View>
    </View>
    );
}