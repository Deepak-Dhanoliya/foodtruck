import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const options = [
  "Manage Profile",
  "Manage Password",
  "Manage Address",
  "Privacy Policy",
  "Contact us",
  "Refer to friends",
];

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.email}>📍 Foodtruck@gmail.com</Text>
      <Text style={styles.city}>Indore, M.P</Text>

      {options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.row}>
          <Text>{item}</Text>
          <Text>›</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.logout}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1,marginTop:45 },
  email: { fontWeight: "600" },
  city: { color: "#777", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
  },
  logout: { color: "red", marginTop: 20 },
});
