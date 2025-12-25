import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/api";

/* ---------------- MOCK DATA ---------------- */

const favourites = [
  {
    id: "1",
    name: "Ayush's Food Shack",
    location: "MG Road",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "2",
    name: "Ayush's Food Shack",
    location: "MG Road",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "3",
    name: "Ayush's Food Shack",
    location: "MG Road",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "4",
    name: "Ayush's Food Shack",
    location: "MG Road",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
];

/* ---------------- SCREEN ---------------- */

export default function FavouriteScreen() {
  const { user } = useUser(); // ✅ ONLY user from context
  const [userData, setUserData] = useState<any>(null);

  /* 🔹 Fetch user using mobile from context */
  useEffect(() => {
    if (!user?.mobile) return;

    fetch(`${API_URL}/api/user/by-mobile/${user.mobile}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log("Account fetch error", err));
  }, [user?.mobile]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={36} color="#FFC529" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.email}>
              {userData?.name || "Foodtruck@gmail.com"}
            </Text>
            <Text style={styles.city}>
              {userData?.location?.address || "Indore, M.P"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bellWrapper}
            onPress={() => router.push("/notification")}
          >
            <Ionicons name="notifications-outline" size={25} />
          </TouchableOpacity>
        </View>

        <TextInput placeholder="Search" placeholderTextColor="#766868ff" style={styles.search} />
      </View>

      {/* LIST */}
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.location}</Text>

              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FFC529" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            <Ionicons name="heart" size={22} color="#FF3B30" />
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  header: {
    paddingHorizontal: 16,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
  },

  city: {
    fontSize: 12,
    color: "#777",
  },

  bellWrapper: {
    marginLeft: "auto",
  },

  search: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FFC529",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFF6DC",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    borderRadius: 14,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
  },

  address: {
    fontSize: 12,
    color: "#777",
    marginVertical: 2,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6DC",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },

  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
});
