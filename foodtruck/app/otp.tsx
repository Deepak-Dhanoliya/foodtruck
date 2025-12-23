import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function OTPScreen() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const verifyOtp = () => {
    if (otp === "123") {
      router.replace({
        pathname: "/(tabs)",
        params: { mobile },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify OTP</Text>
      <Text>OTP sent to {mobile}</Text>

      <TextInput
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
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
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontWeight: "600" },
});
