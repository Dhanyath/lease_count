import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

const RemovePlayerScreen = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem(
          "playersDetailsWithScores"
        );
        if (storedPlayers) {
          setPlayers(JSON.parse(storedPlayers));
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleRemovePlayers = async () => {
    const updatedPlayers = players.filter(
      (player) => !selectedPlayers.includes(player.id)
    );
    setPlayers(updatedPlayers);
    console.log("Updated Players:", updatedPlayers);
    await AsyncStorage.setItem(
      "playersDetailsWithScores",
      JSON.stringify(updatedPlayers)
    );
    if (updatedPlayers.length === 0) {
      Alert.alert(
        "Do you want to remove all players?",
        "If you remove all players game will be ended",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.clear();
              router.replace("/dashboard");
            },
          },
        ]
      );
    } else {
      router.replace("/dashboard");
    }
    setSelectedPlayers([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((playerId) => playerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remove Player</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <View style={styles.playerCardContent}>
              <Checkbox
                value={selectedPlayers.includes(item.id)}
                onValueChange={() => toggleSelection(item.id)}
              />
              <Text
                style={
                  item["totalScores"] > 100
                    ? styles.playerTextRed
                    : styles.playerText
                }
              >
                {item.name}
              </Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={[
          styles.button,
          selectedPlayers.length === 0 && styles.disabledButton,
        ]}
        onPress={handleRemovePlayers}
        disabled={selectedPlayers.length === 0}
      >
        <Text style={styles.buttonText}>Remove Selected Players</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "80%",
  },
  playerText: {
    fontSize: 18,
    marginLeft: 10,
  },
  playerTextRed: {
    fontSize: 18,
    marginLeft: 10,
    color: "red",
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#d9534f",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  playerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  playerCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RemovePlayerScreen;
