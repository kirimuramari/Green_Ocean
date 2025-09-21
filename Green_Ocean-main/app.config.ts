import { ExpoConfig } from "@expo/config-types";
import "dotenv/config";

const config: ExpoConfig = {
  name: "my-app",
  slug: "MyApp",
  version: "1.0.0",
  owner: "makkiy",
  android: {
    package: "com.makkiy.myapp",
  },
  scheme: "myapp",
  extra: {
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

    eas: {
      projectId: "3aa8abf5-0d24-4dff-b372-11212e6fcc36",
    },
  },
};

export default config;
