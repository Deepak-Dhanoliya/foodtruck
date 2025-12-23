import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "@/constants/api";

export default function SignupScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
  try {
    const res = await fetch(`${API_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    router.push({
      pathname: "/location",
      params: { user: JSON.stringify(data.user) },
    });
  } catch (err) {
    console.log("Signup error", err);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create an account</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      <TextInput
        placeholder="Mobile no."
        keyboardType="phone-pad"
        style={styles.input}
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v)}
      />
      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
        value={form.age}
        onChangeText={(v) => handleChange("age", v)}
      />
      

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/login")}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#999",
  },
  link: {
    color: "#FFC529",
    fontWeight: "600",
  },
});
