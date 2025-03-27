import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Button,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function MenuCard() {
  const router = useRouter();
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("/");
      console.log("AsyncStorage cleared");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  const shareGame = async () => {
    try {
      await Share.share({
        message:
          "Join me in Lease Count Game! Download here: https://leasecountgame.com",
      });
    } catch (error) {
      console.log("Error Occured");
    }
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/addplayersscores")}
        >
          <Text style={styles.buttonText}>Add Scores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.fullScoreboardButton]}
          onPress={() => router.push("/fullscorecard")}
        >
          <Text style={styles.buttonText}>Full Scoreboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.editScoresButton]}
          onPress={() => router.push("/editscores")}
        >
          <Text style={styles.buttonText}>Edit Scores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.removePlayerButton]}
          onPress={() => router.push("/removeplayer")}
        >
          <Text style={styles.buttonText}>Remove Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.endGameButton]}
          onPress={() => {
            Alert.alert("Warning", "Are you sure you want to end the game?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "End Game",
                onPress: () => clearStorage(),
              },
            ]);
          }}
        >
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={shareGame}
          style={{
            backgroundColor: "#28a745",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Share Game
          </Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     alignItems: "center",
  //   },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
  },
  table: {
    // borderWidth: 2,
    // borderColor: "black",
    width: "70%",
  },
  row: {
    // borderBottomWidth: 2,
    borderColor: "black",
  },
  cell: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fullScoreboardButton: {
    backgroundColor: "#3498db",
  },
  editScoresButton: {
    backgroundColor: "orange",
  },
  removePlayerButton: {
    backgroundColor: "grey",
  },
  extraButton: {
    backgroundColor: "#2ecc71",
  },
  endGameButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
