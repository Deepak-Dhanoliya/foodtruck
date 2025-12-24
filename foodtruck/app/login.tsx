import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../constants/api";

export default function LoginScreen() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!mobile) {
      setError("Required*. Please enter your mobile number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/user/check-mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (data.exists) {
        router.push({
          pathname: "/otp",
          params: { mobile, userId: data.userId },
        });
      } else {
        setError("Signup required. Mobile number not registered.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/images/pizza.png")}
        style={styles.image}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <Text style={styles.label}>Email/Mobile no.</Text>

        <TextInput
          placeholder="Enter Email/Mobile no."
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.info}>
          You will receive your OTP on your mobile no.
        </Text>

        <Text style={styles.signupText} onPress={() => router.push("/signup")}>
          Don’t have an account? <Text style={styles.signup}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "30%",
  },

  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 4000,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFF6DC",
    marginBottom: 10,
  },

  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },

  info: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 12,
  },

  signupText: {
    textAlign: "center",
    marginTop: 15,
    color: "#555",
  },

  signup: {
    color: "#FFC529",
    fontWeight: "600",
  },
});
