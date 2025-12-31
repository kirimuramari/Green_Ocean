//フォーム
import { formStyles } from "@/theme/formStyles";
import { Colorform } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { Switch, Text, TextInput, View } from "react-native";

type Props = {
  form: Colorform;
  onChange: <K extends keyof Colorform>(key: K, value: Colorform[K]) => void;
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
        keyboardType="numeric"
        style={formStyles.input}
      />

      <Text style={formStyles.label}>商品名</Text>
      <TextInput
        value={form.商品名}
        onChangeText={(text) => onChange("商品名", text)}
        autoCorrect={false}
        autoCapitalize="none"
        inputMode="text"
        returnKeyType="done"
        style={formStyles.input}
      />
      <Text style={formStyles.label}>フリガナ</Text>
      <TextInput
        value={form.フリガナ}
        onChangeText={(text) => onChange("フリガナ", text)}
        autoCorrect={false}
        autoCapitalize="none"
        inputMode="text"
        returnKeyType="done"
        style={formStyles.input}
      />
      <Text style={formStyles.label}>値段</Text>
      <TextInput
        value={form.値段 !== null ? String(form.値段) : ""}
        onChangeText={(text) =>
          onChange("値段", text === "" ? null : Number(text))
        }
        keyboardType="numeric"
        style={formStyles.input}
      />
      <Text style={formStyles.label}>セット名</Text>
      <Picker
        selectedValue={form.セット名 || ""}
        onValueChange={(value) => onChange("セット名", value)}
        style={formStyles.picker}
      >
        <Picker.Item label="選択してください" value="" />
        {setList.map((name) => (
          <Picker.Item key={name} label={name} value={name} />
        ))}
      </Picker>

      <View style={formStyles.switchContainer}>
        <Text style={formStyles.label}>
          {form.購入済み ? "購入済み" : "未購入"}
        </Text>
        <Switch
          value={form.購入済み}
          onValueChange={(value) => onChange("購入済み", value)}
        />
      </View>
    </View>
  );
}
