import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

const cuisines = [
  {
    title: "Pancakes With Maple Syrup",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
  },
  {
    title: "Italian Chopped Salad",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

const categories = [
  { title: "American", emoji: "🍔" },
  { title: "Chinese", emoji: "🍜" },
  { title: "Italian", emoji: "🍕" },
  { title: "Turkish", emoji: "🥙" },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.location}>📍 Foodtruck@gmail.com</Text>
        <Text style={styles.subLocation}>Indore, M.P</Text>
      </View>

      <TextInput placeholder="Search" style={styles.search} />

      <Text style={styles.section}>Discover New Cuisines</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cuisines.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.section}>Top Categories</Text>

      <View style={styles.categories}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.category}>
            <Text style={styles.categoryIcon}>{cat.emoji}</Text>
            <Text>{cat.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" ,marginTop:45},
  header: { marginBottom: 12 },
  location: { fontWeight: "600" },
  subLocation: { color: "#777", fontSize: 12 },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  section: { fontSize: 18, fontWeight: "700", marginVertical: 10 },
  card: { width: 180, marginRight: 12 },
  cardImage: { width: "100%", height: 120, borderRadius: 12 },
  cardTitle: { marginTop: 8, fontWeight: "600" },
  rating: { color: "#FFC529" },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  category: {
    alignItems: "center",
    width: "22%",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  categoryIcon: { fontSize: 28 },
});
