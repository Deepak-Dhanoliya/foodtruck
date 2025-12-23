import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../constants/api";

export default function LocationScreen() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState("");

  const saveLocation = async () => {
    await fetch(`${API_URL}/api/user/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        location: {
          address: location,
          latitude: 22.7196,
          longitude: 75.8577,
        },
      }),
    });

    router.replace("/map");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter location" style={styles.input} onChangeText={setLocation} />
      <TouchableOpacity style={styles.button} onPress={saveLocation}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1 },
  input: { borderWidth: 1, padding: 14, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: "#FFC529", padding: 16, borderRadius: 10, alignItems: "center" },
});
