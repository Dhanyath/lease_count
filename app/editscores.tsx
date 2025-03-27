// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Button, FlatList } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Picker } from "@react-native-picker/picker";

// export interface Player {
//   id: number;
//   name: string;
//   scores: number[];
//   totalScores: number;
//   isInGame: boolean;
// }

// const STORAGE_KEY = "playersDetailsWithScores";

// const EditScores = () => {
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [selectedRound, setSelectedRound] = useState<number>(0);

//   useEffect(() => {
//     loadPlayers();
//   }, []);

//   const loadPlayers = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem(STORAGE_KEY);
//       if (storedData) {
//         setPlayers(JSON.parse(storedData));
//       }
//     } catch (error) {
//       console.error("Failed to load players", error);
//     }
//   };

//   const updateScore = (id: number, newScore: number) => {
//     setPlayers((prevPlayers) =>
//       prevPlayers.map((player) => {
//         if (player.id === id) {
//           const updatedScores = [...player.scores];
//           updatedScores[selectedRound] = newScore;
//           return {
//             ...player,
//             scores: updatedScores,
//             totalScores: updatedScores.reduce((a, b) => a + b, 0),
//           };
//         }
//         return player;
//       })
//     );
//   };

//   const saveScores = async () => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players));
//       alert("Scores updated successfully!");
//     } catch (error) {
//       console.error("Failed to save scores", error);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Select Round:</Text>
//       <Picker
//         selectedValue={selectedRound.toString()} // Convert number to string
//         onValueChange={(itemValue) => setSelectedRound(parseInt(itemValue, 10))} // Convert string back to number
//       >
//         {[...Array(20).keys()].map((round) => (
//           <Picker.Item
//             key={round}
//             label={`Round ${round + 1}`}
//             value={round.toString()}
//           /> // Ensure value is a string
//         ))}
//       </Picker>
//       {/* <DropD */}
//       <FlatList
//         data={players}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginBottom: 10,
//             }}
//           >
//             <Text style={{ flex: 1 }}>{item.name}</Text>
//             <TextInput
//               style={{
//                 borderWidth: 1,
//                 padding: 5,
//                 width: 60,
//                 textAlign: "center",
//               }}
//               keyboardType="numeric"
//               value={item.scores[selectedRound]?.toString() || "0"}
//               onChangeText={(text) => updateScore(item.id, parseInt(text) || 0)}
//             />
//           </View>
//         )}
//       />

//       <Button title="Update Scores" onPress={saveScores} />
//     </View>
//   );
// };

// export default EditScores;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

export interface Player {
  id: number;
  name: string;
  scores: number[];
  totalScores: number;
  isInGame: boolean;
}

const STORAGE_KEY = "playersDetailsWithScores";

const EditScores = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [roundNumber, setRoundNumber] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const storedRoundNumber = await AsyncStorage.getItem("roundNumber");
      if (storedRoundNumber) {
        console.log("Stored Round Number: ", storedRoundNumber);
        setRoundNumber(Number(storedRoundNumber));
      }
      if (storedData) {
        setPlayers(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load players", error);
    }
  };

  const updateScore = (id: number, newScore: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === id) {
          const updatedScores = [...player.scores];
          updatedScores[selectedRound] = newScore;
          return {
            ...player,
            scores: updatedScores,
            totalScores: updatedScores.reduce((a, b) => a + b, 0),
          };
        }
        return player;
      })
    );
  };

  const saveScores = async () => {
    const hasInvalidScore = players.some(
      (player) => player.scores[selectedRound] > 101
    );
    const notHavingScore = players.some(
      (player) => player.scores[selectedRound] == undefined && player.isInGame
    );

    if (notHavingScore) {
      Alert.alert("🚫Tappu🚫", "Arey guddi andhari scores enter chey👓.");
      return;
    }
    if (hasInvalidScore) {
      Alert.alert(
        "🚫Tappu🚫",
        "Arey babu e game highest eh 101. Chusi enter chey ra babu scores🤦‍♂️."
      );
      return;
    }

    const sample = players;
    sample.map(
      (player) => (
        (player.totalScores = player.scores.reduce(
          (sum, score) => sum + Number(score),
          0
        )),
        (player.isInGame = player.totalScores > 100 ? false : true)
      )
    );

    try {
      console.log("Updated Players Scores: ", players);
      await AsyncStorage.setItem(
        "playersDetailsWithScores",
        JSON.stringify(players)
      );
      Alert.alert("Success", "Scores updated successfully!", [
        {
          text: "Go To Dashboard",
          onPress: async () => {
            router.replace("/");
          },
        },
      ]);
    } catch (error) {
      console.error("Failed to save scores", error);
    }
  };

  return (
    <View style={styles.container}>
      {roundNumber !== 0 ? (
        <>
          <Text style={styles.label}>Select Round:</Text>
          <Picker
            selectedValue={selectedRound.toString()}
            onValueChange={(itemValue) =>
              setSelectedRound(parseInt(itemValue, 10))
            }
            style={styles.picker}
          >
            {[...Array(roundNumber).keys()].map((round) => (
              <Picker.Item
                key={round}
                label={`Round ${round + 1}`}
                value={round.toString()}
              />
            ))}
          </Picker>
          <Text style={styles.playerRow}>
            Please Select Round Number to edit players score
          </Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.playerRow}>
                <Text style={styles.playerName}>{item.name}</Text>
                <TextInput
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  value={item.scores[selectedRound]?.toString() || "0"}
                  onChangeText={(text) =>
                    updateScore(item.id, parseInt(text) || 0)
                  }
                />
              </View>
            )}
          />
          <Button
            children="Update Scores"
            mode="contained"
            onPress={() => {
              saveScores();
            }}
            style={{ backgroundColor: "#4CAF50" }}
          />
        </>
      ) : (
        <Text style={styles.matchStatus}>
          Game in progress, waiting for the round to start.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 60,
    textAlign: "center",
    borderRadius: 5,
  },
  matchStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
});

export default EditScores;
