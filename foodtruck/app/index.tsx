import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      }}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Fast Food Near{"\n"}Your Home</Text>
        <Text style={styles.subtitle}>
          Find wide range of cuisines of nearby food trucks
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 120,
  },
  subtitle: {
    color: "#fff",
    marginTop: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FFC529",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
