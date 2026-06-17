//フォーム
import { formStyles } from "@/theme/formStyles";
import { Colorform } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { Switch, Text, TextInput, View } from "react-native";
import { FormField } from "../edit/FormField";


type Props = {
  form: Colorform;
  onChange: <K extends keyof Colorform>(
    key: K, 
    value: Colorform[K]
  ) => void;
  setList: string[];
  mode: "create" | "edit";
  readonlyNumber?: number;
  onSubmitEditing?: () => void;
};
export function ColorFormView({
  form,
  onChange,
  setList,
  mode,
  readonlyNumber,
  onSubmitEditing,
}: Props) {
  const isEdit = mode === "edit";


  return (
    <View style={formStyles.container}>
      {readonlyNumber && (
        <Text style={formStyles.label}>番号：{readonlyNumber}</Text>
      )}
      <Text style={formStyles.label}>コード</Text>
      <TextInput
        value={form.コード !== null ? String(form.コード) : ""}
        onChangeText={(text) =>
          onChange("コード", text === "" ? "" : Number(text))
        }
        editable={!isEdit}
        keyboardType="numeric"
        style={formStyles.input}
      />

      <FormField label="商品名">
      <TextInput
        value={form.商品名}
        onChangeText={(text) => onChange("商品名", text)}
        autoCorrect={false}
        autoCapitalize="none"
        inputMode="text"
        returnKeyType="done"
        style={formStyles.input}
      />     
      </FormField>
      <FormField label="フリガナ">
      <TextInput
        value={form.フリガナ}
        onChangeText={(text) => onChange("フリガナ", text)}
        autoCorrect={false}
        autoCapitalize="none"
        inputMode="text"
        returnKeyType="done"
        style={formStyles.input}
      />
      </FormField>
      <FormField label="値段">
      <TextInput
        value={form.値段 !== null ? String(form.値段) : ""}
        onChangeText={(text) =>
          onChange("値段", text === "" ? null : Number(text))
        }
        keyboardType="numeric"
        style={formStyles.input}
      />
      </FormField>
      <FormField label="セット名">
      <View style={formStyles.pickerContainer}>

      <Picker
        selectedValue={form.セット名 || ""}
        onValueChange={(value) => onChange("セット名", value)}
        style={formStyles.picker}
      >
        <Picker.Item label="選択してください" 
        value="" 
      
        />

        {setList.map((name) => (
          <Picker.Item key={name} label={name} value={name} />
        ))}
      </Picker>

      </View>

      </FormField>
      <FormField label="購入済み">
      <View style={formStyles.switchContainer}>
        <Text style={formStyles.label}>
          {form.購入済み ? "購入済み" : "未購入"}
        </Text>
        <Switch
          value={form.購入済み}
          onValueChange={(value) => onChange("購入済み", value)}
        />
      </View>

      </FormField>
    </View>
  );
}
