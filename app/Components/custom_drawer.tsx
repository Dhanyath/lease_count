import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { JSX, RefAttributes } from "react";

export default function CustomDrawer(
  props: JSX.IntrinsicAttributes &
    ScrollViewProps & { children: React.ReactNode } & RefAttributes<ScrollView>
) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
          Welcome!
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons name="home" size={24} color="black" />
        <Text style={{ marginLeft: 10, color: "black", fontSize: 16 }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons name="stats-chart" size={24} color="black" />
        <Text style={{ marginLeft: 10, color: "black", fontSize: 16 }}>
          Dashboard
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
