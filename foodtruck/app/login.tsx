import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../constants/api";

export default function LoginScreen() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const handleLogin = async () => {
    if (!mobile) return;

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
      router.replace("/signup");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={setMobile}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontWeight: "600" },
});
