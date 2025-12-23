import { View, Text, StyleSheet, Image, ScrollView, TextInput } from "react-native";

const favourites = Array(6).fill({
  name: "Ayush’s Food Shack",
  rating: "4.3",
  image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
});

export default function FavouritesScreen() {
  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Search" style={styles.search} />

      {favourites.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>❤️</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" ,marginTop:45},
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 12,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  title: { fontWeight: "600" },
  rating: { color: "#FFC529" },
});
