import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@/constants/api";

const MOCK_LOCATIONS = [
  { name: "Rajwada, Indore", lat: 22.7196, lng: 75.8577 },
  { name: "Vijay Nagar, Indore", lat: 22.7533, lng: 75.8937 },
  { name: "Palasia, Indore", lat: 22.7236, lng: 75.8839 },
  { name: "Bhawarkua, Indore", lat: 22.6891, lng: 75.8679 },
  { name: "MG Road, Indore", lat: 22.7179, lng: 75.8576 },
  { name: "Navlakha, Indore", lat: 22.7218, lng: 75.8313 },
  { name: "Sukhliya, Indore", lat: 22.737, lng: 75.927 },
  { name: "Malviya Nagar, Indore", lat: 22.7475, lng: 75.9051 },
  { name: "Azad Nagar, Indore", lat: 22.7201, lng: 75.8501 },
  { name: "Tilak Nagar, Indore", lat: 22.723, lng: 75.865 },
  { name: "Race Course Road, Indore", lat: 22.7082, lng: 75.8505 },
  { name: "Scheme No. 54, Indore", lat: 22.7528, lng: 75.9005 },
  { name: "Scheme No. 78, Indore", lat: 22.7443, lng: 75.9022 },
  { name: "Scheme No. 71, Indore", lat: 22.748, lng: 75.8912 },
  { name: "Scheme No. 140, Indore", lat: 22.739, lng: 75.88 },
  { name: "Scheme No. 94, Indore", lat: 22.742, lng: 75.905 },
  { name: "AB Road, Indore", lat: 22.735, lng: 75.85 },
  { name: "AB Bypass Road, Indore", lat: 22.7355, lng: 75.84 },
  { name: "Geeta Bhawan, Indore", lat: 22.7121, lng: 75.8794 },
  { name: "Nipania, Indore", lat: 22.744, lng: 75.8743 },
  { name: "Rau, Indore", lat: 22.7205, lng: 75.7132 },
  { name: "Super Corridor, Indore", lat: 22.7512, lng: 75.7728 },
  { name: "South Tukoganj, Indore", lat: 22.7169, lng: 75.8401 },
  { name: "Annapurna, Indore", lat: 22.714, lng: 75.861 },
  { name: "Shivaji Nagar, Indore", lat: 22.721, lng: 75.859 },
  { name: "Bengali Square, Indore", lat: 22.7096, lng: 75.8475 },
  { name: "Rajendra Nagar, Indore", lat: 22.735, lng: 75.872 },
  { name: "Khandwa Road Area, Indore", lat: 22.71, lng: 75.825 },
  { name: "Telephone Nagar, Indore", lat: 22.725, lng: 75.88 },
  { name: "Niranjanpur, Indore", lat: 22.73, lng: 75.86 },
  { name: "Piplyahana, Indore", lat: 22.732, lng: 75.855 },
  { name: "Manglia, Indore", lat: 22.728, lng: 75.84 },
  { name: "Khajrana, Indore", lat: 22.703, lng: 75.839 },
  { name: "Indra Puri Colony, Indore", lat: 22.74, lng: 75.88 },
  { name: "Shivampuri Colony, Indore", lat: 22.742, lng: 75.885 },
  { name: "Sanchar Nagar Main, Indore", lat: 22.743, lng: 75.89 },
  { name: "Girdhar Nagar, Indore", lat: 22.735, lng: 75.89 },
  { name: "Triveni Colony, Indore", lat: 22.736, lng: 75.892 },
  { name: "Sarv Suvidha Nagar, Indore", lat: 22.738, lng: 75.893 },
  { name: "Musakhedi, Indore", lat: 22.724, lng: 75.85 },
  { name: "Mayakhedi, Indore", lat: 22.726, lng: 75.848 },
  { name: "Talawali Chanda, Indore", lat: 22.747, lng: 75.867 },
  { name: "Shri Nagar Extension, Indore", lat: 22.749, lng: 75.87 },
  { name: "Hathipala, Indore", lat: 22.75, lng: 75.875 },
  { name: "Bhatkhedi, Indore", lat: 22.751, lng: 75.88 },
  { name: "Krishi Mandi Area, Indore", lat: 22.752, lng: 75.882 },
  { name: "MOG Lines Area, Indore", lat: 22.753, lng: 75.884 },
  { name: "Sarv Suvidha Nagar Extension, Indore", lat: 22.754, lng: 75.885 },
  { name: "Pardesipura, Indore", lat: 22.72, lng: 75.87 },
  { name: "Nanda Nagar, Indore", lat: 22.722, lng: 75.871 },
  { name: "Anoop Nagar, Indore", lat: 22.723, lng: 75.872 },
  { name: "Indraprasth, Indore", lat: 22.727, lng: 75.87 },
  { name: "Teleperformance Area, Indore", lat: 22.728, lng: 75.873 },
  { name: "Silicon City, Indore", lat: 22.729, lng: 75.874 },
  { name: "Silver Springs, Indore", lat: 22.73, lng: 75.875 },
  { name: "Anand Bazar Area, Indore", lat: 22.731, lng: 75.876 },
  { name: "Sapna Sangeeta, Indore", lat: 22.732, lng: 75.877 },
  { name: "Saket Area, Indore", lat: 22.733, lng: 75.878 },
  { name: "56 Dukan Street, Indore", lat: 22.734, lng: 75.879 },
  { name: "11 Bungalow Colony, Indore", lat: 22.735, lng: 75.88 },
  { name: "Bhuri Tekri Colony, Indore", lat: 22.736, lng: 75.881 },
  { name: "Bijali Nagar, Indore", lat: 22.737, lng: 75.882 },
  { name: "Ganesh Puri Colony, Indore", lat: 22.738, lng: 75.883 },
  { name: "Dhananjay Nagar, Indore", lat: 22.739, lng: 75.884 },
  { name: "Devpuri Colony, Indore", lat: 22.74, lng: 75.885 },
  { name: "College Colony, Indore", lat: 22.741, lng: 75.886 },
  { name: "Friend’s House Colony, Indore", lat: 22.742, lng: 75.887 },
  { name: "Dhanshree Colony, Indore", lat: 22.743, lng: 75.888 },
];

export default function LocationScreen() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams<{ mobile: string }>();

  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const [region, setRegion] = useState<Region>({
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  /* ✅ FETCH USER USING MOBILE */
  useEffect(() => {
    if (!mobile) return;

    fetch(`${API_URL}/api/user/by-mobile/${mobile}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        if (data?.city?.toLowerCase().includes("indore")) {
          setRegion({
            latitude: 22.7196,
            longitude: 75.8577,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
        }
      })
      .catch((err) => console.log("User fetch error", err));
  }, [mobile]);

  /* SEARCH */
  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      MOCK_LOCATIONS.filter((l) =>
        l.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const selectLocation = (item: any) => {
    setSelectedLocation(item);
    setSearch(item.name);
    setModalVisible(false);

    setRegion({
      latitude: item.lat,
      longitude: item.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  /* ✅ SAVE LOCATION (SAFE) */
  const saveLocation = async () => {
    if (!user || !selectedLocation) {
        setError("Search and Select a location to continue.");
      return;
    }
    // console.log(user, selectedLocation);

    setLoading(true);
    try {
      await fetch(`${API_URL}/api/user/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          location: {
            address: selectedLocation.name,
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          },
        }),
      });

      router.replace({
        pathname: "/otp",
        params: { mobile: user.mobile },
      });
    } catch (err) {
      console.log("Location save error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Enter your location</Text>
      </View>

      {/* SEARCH */}
      <TouchableOpacity
        style={styles.searchTrigger}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="search" size={18} color="#777" />
        <Text style={styles.searchText}>
          {selectedLocation ? selectedLocation.name : "Search your location"}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* MAP */}
      <MapView style={styles.map} region={region}>
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>

      {/* CONTINUE */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={saveLocation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>

            <TextInput
              autoFocus
              placeholder="Search area, street, landmark"
              value={search}
              onChangeText={handleSearch}
              style={styles.modalInput}
            />
          </View>

          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => selectLocation(item)}
              >
                <Ionicons name="location-outline" size={18} />
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

/* STYLES SAME AS YOUR FILE */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 10,
  },
  title: { fontSize: 22, fontWeight: "700" },
  searchTrigger: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 10,
  },
  searchText: { color: "#777" },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 12,
  },
  map: { flex: 1 },
  button: {
    backgroundColor: "#FFC529",
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: { fontWeight: "600", fontSize: 16 },
  modal: { flex: 1, backgroundColor: "#fff" },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 10,
  },
  modalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
  },
  optionText: { fontSize: 15 },
});
