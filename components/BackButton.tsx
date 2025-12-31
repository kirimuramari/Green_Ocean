import { formStyles } from "@/theme/formStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
type Props = {
  to?: string;
  size?: number;
};
export const BackButton = ({ to = "/", size = 24 }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace(to)}
      style={formStyles.arrowButton}
    >
      <Ionicons name="arrow-back" size={size} />
    </TouchableOpacity>
  );
};
