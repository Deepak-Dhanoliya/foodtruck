import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Region } from "react-native-maps";
import { API_URL } from "@/constants/api";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";

/* ---------------- TYPES ---------------- */

type Location = {
  address: string;
  latitude: number;
  longitude: number;
};

type Truck = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

/* ---------------- SCREEN ---------------- */

export default function MapScreen() {
  const { user } = useUser(); // ✅ mobile from context

  const [location, setLocation] = useState<Location | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [region, setRegion] = useState<Region | null>(null);

  /* ---------------- FETCH USER LOCATION ---------------- */

  useEffect(() => {
    if (!user?.mobile) return;

    const fetchLocation = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/by-mobile/${user.mobile}`);
        const data = await res.json();

        if (data?.location) {
          setLocation(data.location);

          setRegion({
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          generateNearbyTrucks(data.location.latitude, data.location.longitude);
        }
      } catch (err) {
        console.log("Location fetch error", err);
      }
    };

    fetchLocation();
  }, [user]);

  /* ---------------- GENERATE TRUCKS (LOCAL LOGIC) ---------------- */

  const generateNearbyTrucks = (lat: number, lng: number) => {
    const generated: Truck[] = [];

    for (let i = 0; i < 6; i++) {
      generated.push({
        id: i + 1,
        name: `Food Truck ${i + 1}`,
        latitude: lat + (Math.random() - 0.5) * 0.01,
        longitude: lng + (Math.random() - 0.5) * 0.01,
      });
    }

    setTrucks(generated);
  };

  /* ---------------- WEB FALLBACK ---------------- */

  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <Text>Map available on mobile only</Text>
      </View>
    );
  }

  if (!region) return null;

  /* ---------------- UI ---------------- */

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView style={StyleSheet.absoluteFillObject} region={region}>
        {/* USER LOCATION */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Ionicons name="location-sharp" size={36} color="#FF3B30" />
          </Marker>
        )}

        {/* TRUCKS */}
        {trucks.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: truck.latitude,
              longitude: truck.longitude,
            }}
          >
            <Text style={styles.truckIcon}>🚚</Text>
          </Marker>
        ))}
      </MapView>

      {/* TOP OVERLAY */}
      <View style={styles.topOverlay}>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={36} color="#FFC529"/>

          <View>
            <Text style={styles.email}>{user?.mobile}</Text>
            <Text style={styles.city}>
              {location?.address || "Your location"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/notification")}
            style={styles.bellWrapper}
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              style={styles.bell}
            />
          </TouchableOpacity>
        </View>

        <TextInput placeholder="Search" style={styles.searchBox} />
      </View>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sectionTitle}>Nearby Food Trucks</Text>

        <FlatList
          horizontal
          data={trucks}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.truckCard}>
              <Text style={styles.cardIcon}>🚚</Text>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

/* ---------------- STYLES (UNCHANGED) ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topOverlay: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 5,
  },

  locationIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
  },

  city: {
    fontSize: 12,
    color: "#666",
  },
  bellWrapper: {
    marginLeft: "auto",
  },

  bell: {
    marginLeft: "auto",
    fontSize: 25,
  },

  searchBox: {
    marginTop: 12,
    backgroundColor: "#FFF6DC",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFC529",
  },

  truckIcon: {
    fontSize: 20,
  },

  homeMarker: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  userPin: {
    width: 40,
    height: 40,
  },

  homeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 12,
  },

  truckCard: {
    width: 120,
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    marginRight: 12,
  },

  cardIcon: {
    fontSize: 26,
    marginBottom: 6,
  },

  cardText: {
    fontSize: 13,
    fontWeight: "600",
  },

  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
  },
});
