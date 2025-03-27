import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();

  return (
    <View
      className="flex-row items-center justify-between"
      style={styles.container}
    >
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Index" }} />
      </Drawer>
      <Text
        className="text-lg font-semibold flex-1 text-center"
        style={styles.title}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => {}} className="p-2">
        <Ionicons
          name="home"
          size={24}
          style={{ marginRight: 10 }}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#00294d",
    backgroundColor: "#169c52",
    // backgroundColor: "#3e709c",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 9999,
    minHeight: 60,
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 22,
    margin: 10,
  },
  iconButton: {
    padding: 10,
  },
});
