// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationScreen() {
  const { notifications } = useNotifications();

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}


// const notifications = [
//   {
//     id: "1",
//     message: "Ayush's Food Shack will be closed for the new year day",
//   },
//   {
//     id: "2",
//     message: "Your order was cancelled !!",
//   },
//   {
//     id: "3",
//     message: "Welcome to Foodtruck!",
//   },
// ];

// export default function NotificationsScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Notifications</Text>
//       </View>

//       {/* LIST */}
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//         renderItem={({ item }) => (
//           <View style={styles.notificationCard}>
//             <Text style={styles.message}>{item.message}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// /* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },

  list: {
    padding: 16,
  },

  notificationCard: {
    backgroundColor: "#EFEFEF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#EFEFEF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  message: {
    fontSize: 14,
    color: "#444",
  },
});

