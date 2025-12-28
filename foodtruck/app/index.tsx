import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  const router = useRouter();

  

  return (
    <ImageBackground
      source={require("../assets/images/wallpaper.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* OVERLAY CONTENT */}
      <View style={styles.content}>
        {/* TEXT */}
        <View>
          <Text style={styles.title}>Fast Food Near{"\n"}Your Home</Text>

          <Text style={styles.subtitle}>
            Find wide range of Cuisines of Nearby{"\n"}Food Trucks
          </Text>
        </View>

        {/* BUTTONS */}
        <View>
          {/* LOGIN */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          {/* APPLE */}
          <TouchableOpacity style={styles.socialButtonBlack}>
            <Ionicons name="logo-apple" size={18} color="#fff" />
            <Text style={styles.socialText}>Continue With Apple</Text>
          </TouchableOpacity>

          {/* META */}
          <TouchableOpacity style={styles.socialButtonBlue}>
            <Ionicons name="logo-facebook" size={18} color="#fff" />
            <Text style={styles.socialText}>Continue With Meta</Text>
          </TouchableOpacity>

          {/* GOOGLE */}
          <TouchableOpacity style={styles.socialButtonGreen}>
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text style={styles.socialText}>Continue With Google</Text>
          </TouchableOpacity>

          {/* SIGNUP */}
          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text
              style={styles.signupLink}
              onPress={() => router.push("/signup")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 120,
  },

  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },

  loginButton: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  orText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },

  socialButtonBlack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  socialButtonBlue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1877F2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  socialButtonGreen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34A853",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  socialText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },

  signupText: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },

  signupLink: {
    color: "#FFC529",
    fontWeight: "600",
  },
});
