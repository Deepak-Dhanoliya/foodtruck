import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { API_URL } from "@/constants/api";

type Truck = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const USER_LOCATION = {
  latitude: 28.6139,
  longitude: 77.209,
};



export default function MapScreen() {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    const fetchTrucks = async () => {
      const res = await fetch(
        `${API_URL}/api/foodtrucks/nearby?lat=28.6139&lng=77.209`
      );
      const data = await res.json();
      setTrucks(data);
    };

    fetchTrucks();
  }, []);
  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <Text>Map available on mobile only</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: USER_LOCATION.latitude,
          longitude: USER_LOCATION.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {/* USER LOCATION */}
        <Marker coordinate={USER_LOCATION}>
          <View style={styles.homeMarker}>
            <Text style={styles.homeText}>Home</Text>
          </View>
        </Marker>

        {/* FOOD TRUCKS */}
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
          <Text style={styles.locationIcon}>📍</Text>
          <View>
            <Text style={styles.email}>Foodtruck@gmail.com</Text>
            <Text style={styles.city}>Indore, M.P</Text>
          </View>
          <Text style={styles.bell}>🔔</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* TOP */
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

  bell: {
    marginLeft: "auto",
    fontSize: 20,
  },

  searchBox: {
    marginTop: 12,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  /* MARKERS */
  truckIcon: {
    fontSize: 20,
  },

  homeMarker: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  homeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* BOTTOM */
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
