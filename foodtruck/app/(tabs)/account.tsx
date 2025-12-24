import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import { useUser } from "@/context/UserContext";

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress?: () => void;
};

export default function AccountScreen() {
  const router = useRouter();
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

  const handleLogout = () => {
    // clear navigation stack
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.locationRowTop}>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={36} color="#FFC529"/>

            <View>
              <Text style={styles.email}>
                {userData?.name || "Foodtruck@gmail.com"}
              </Text>
              <Text style={styles.city}>
                {userData?.location?.address || "Indore, M.P"}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/notification")}>
            <Ionicons
              name="notifications-outline"
              size={22}
              style={styles.bell}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <MenuItem icon="person-outline" label="Manage Profile" />
        <MenuItem icon="lock-closed-outline" label="Manage Password" />
        <MenuItem icon="location-outline" label="Manage Address" />
        <MenuItem icon="document-text-outline" label="Privacy Policy" />

        <View style={styles.divider} />

        <MenuItem icon="call-outline" label="Contact us" />
        <MenuItem icon="share-social-outline" label="Refer to friends" />

        <MenuItem
          icon="log-out-outline"
          label="Logout"
          danger
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

/* ================= MENU ITEM ================= */

function MenuItem({ icon, label, danger, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={20} color={danger ? "red" : "#555"} />
        <Text style={[styles.itemText, danger && { color: "red" }]}>
          {label}
        </Text>
      </View>

      {!danger && <Ionicons name="chevron-forward" size={20} color="#999" />}
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    marginTop: 45,
  },

  header: {
    padding: 16,
    backgroundColor: "#fff",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
  },

  city: {
    fontSize: 12,
    color: "#777",
  },

  bell: {
    marginLeft: "auto",
    fontSize: 25,
  },

  menu: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  locationRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  itemText: {
    fontSize: 15,
    color: "#333",
  },

  divider: {
    height: 8,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
  },
});
