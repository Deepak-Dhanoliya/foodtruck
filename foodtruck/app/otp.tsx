import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { registerForPushNotifications } from "@/utils/notification";
import { API_URL } from "@/constants/api";

export default function OTPScreen() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams<{ mobile: string | string[] }>();
  const mobileParam = Array.isArray(mobile) ? mobile[0] : mobile;
  const { setUser } = useUser();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    if (error) setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp !== "1234") {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    const token = await registerForPushNotifications();
    if (!token) {
      setError("Push token not available");
      return;
    }
    setUser({
      mobile: mobileParam,
      pushToken: token,
    });

    await fetch(`${API_URL}/api/user/save-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: mobileParam, pushToken: token }),
    });

    await fetch(`${API_URL}/api/user/send-login-notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    router.replace({
      pathname: "/(tabs)",
      params: { mobile },
    });
  };

  return (
    <View style={styles.container}>
      {/* BACK ICON */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* TOP IMAGE */}
      <Image
        source={require("../assets/images/pizza.png")}
        style={styles.image}
      />

      {/* WHITE CARD */}
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Login to your account</Text>

        <Text style={styles.otpLabel}>Enter OTP</Text>

        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(v) => handleChange(v, index)}
              keyboardType="numeric"
              maxLength={1}
              style={styles.otpBox}
            />
          ))}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* CONTINUE BUTTON */}
        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* RESEND */}
        <Text style={styles.resend}>Resend OTP</Text>

        {/* SIGN UP */}
        <Text style={styles.footer}>
          Don’t have an account?{" "}
          <Text style={styles.signup} onPress={() => router.replace("/signup")}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  image: {
    width: "100%",
    height: "30%",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    alignItems: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 20,
  },

  subHeading: {
    color: "#777",
    marginBottom: 30,
  },

  otpLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },

  otpRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#FFC529",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#FFF6DC",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#FFC529",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  resend: {
    color: "#FFC529",
    fontWeight: "600",
    marginBottom: 30,
  },

  footer: {
    color: "#777",
  },

  signup: {
    color: "#FFC529",
    fontWeight: "600",
  },
});
