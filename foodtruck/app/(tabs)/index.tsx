import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@/constants/api";

// 🔹 Local images
import SaladImg from "@/assets/images/dish1.png";
import BurgerImg from "@/assets/images/dish2.png";
import DosaImg from "@/assets/images/dish3.jpg";
import PizzaImg from "@/assets/images/pizza.png";

// 🔹 Dish data (can be replaced by backend later)
const dishes = [
  {
    id: "1",
    title: "Italian Chopped Salad",
    rating: 4.3,
    vendor: "Ayush’s Food Shack",
    location: "M.G Road",
    image: SaladImg,
  },
  {
    id: "2",
    title: "Classic Burger",
    rating: 4.5,
    vendor: "Burger Hub",
    location: "Vijay Nagar",
    image: BurgerImg,
  },
  {
    id: "3",
    title: "Masala Dosa",
    rating: 4.6,
    vendor: "South Treat",
    location: "Palasia",
    image: DosaImg,
  },
  {
    id: "4",
    title: "Cheese Burst Pizza",
    rating: 4.4,
    vendor: "Pizza Corner",
    location: "Rajwada",
    image: PizzaImg,
  },
];

// 🔹 Categories
const categories = [
  { title: "American", icon: "🍔" },
  { title: "Chinese", icon: "🍜" },
  { title: "Italian", icon: "🍕" },
  { title: "Turkish", icon: "🥙" },
];

export default function ExploreScreen() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [user, setUser] = useState<any>(null);

  // 🔹 Fetch user using mobile
  useEffect(() => {
    if (!mobile) return;

    fetch(`${API_URL}/api/user/by-mobile/${mobile}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log("User fetch error:", err));
  }, [mobile]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Ionicons name="location-sharp" size={36} color="#FFC529"/>
        <View>
          
          <Text style={styles.hello}>Hello {user?.name || "User"}</Text>
          <Text style={styles.location}>
            {user?.location?.address || "Indore, M.P"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/notification")}
          style={styles.bellWrapper}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            style={styles.bell}
          />
        </TouchableOpacity>
      </View>

      {/* 🔹 SEARCH */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="#766868ff"
        style={styles.search}
      />

      {/* 🔹 DISH SLIDER */}
      <Text style={styles.section}>Discover New Cuisines</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {dishes.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />

            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.vendor}>
                {item.vendor}, {item.location}
              </Text>

              <View style={styles.ratingBox}>
                <Ionicons name="star" size={12} color="#fff" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🔹 CATEGORIES */}
      <Text style={styles.section}>Top Categories</Text>

      <View style={styles.categories}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.category}>
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryText}>{cat.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// 🔹 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  hello: {
    fontWeight: "600",
    fontSize: 14,
  },

  location: {
    fontSize: 12,
    color: "#777",
  },
  bellWrapper: {
    marginLeft: "auto",
  },

  bell: {
    marginLeft: "auto",
    fontSize: 25,
  },

  search: {
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#FFF6DC",
  },

  section: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    width: 190,
    marginRight: 14,
  },

  cardImage: {
    width: "100%",
    height: 250,
    borderRadius: 14,
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  vendor: {
    fontSize: 11,
    color: "#777",
    width: "70%",
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFC529",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  ratingText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 3,
    fontWeight: "600",
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 30,
  },

  category: {
    alignItems: "center",
    width: "22%",
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
  },

  categoryIcon: {
    fontSize: 26,
    marginBottom: 4,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
