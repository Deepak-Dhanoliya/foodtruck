import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "@/constants/api";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    age: "",
    city: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const validate = () => {
    const newErrors: any = {};

    Object.keys(form).forEach((key) => {
      if (!form[key as keyof typeof form]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      router.replace({
        pathname: "/location",
        params: { mobile: form.mobile },
      });
    } catch (err) {
      console.log("Signup error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.push("/login")}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.heading}>Create an account</Text>

      {/* Name */}
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#766868ff"
        style={styles.input}
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Email */}
      <TextInput
        placeholder="Enter your E-mail ID"
        placeholderTextColor="#766868ff"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Mobile */}
      <TextInput
        placeholder="Enter your mobile no."
        placeholderTextColor="#766868ff"
        keyboardType="phone-pad"
        style={styles.input}
        value={form.mobile}
        onChangeText={(v) => handleChange("mobile", v)}
      />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

      {/* Age */}
      <TextInput
        placeholder="Enter your Age"
        placeholderTextColor="#766868ff"
        keyboardType="numeric"
        style={styles.input}
        value={form.age}
        onChangeText={(v) => handleChange("age", v)}
      />
      {errors.age && <Text style={styles.error}>{errors.age}</Text>}

      {/* City */}
      <TextInput
        placeholder="Enter your City"
        placeholderTextColor="#766868ff"
        style={styles.input}
        value={form.city}
        onChangeText={(v) => handleChange("city", v)}
      />
      {errors.city && <Text style={styles.error}>{errors.city}</Text>}

      {/* Button */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{" "}
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

  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    marginTop: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFF6DC",
    marginBottom: 6,
  },

  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },

  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },

  footer: {
    marginTop: 25,
    textAlign: "center",
    color: "#777",
  },

  link: {
    color: "#FFC529",
    fontWeight: "600",
  },
});
