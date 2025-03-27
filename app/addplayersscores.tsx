import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";

export interface Player {
  id: number;
  name: string;
  scores: number[];
  totalScores: number;
  isInGame: boolean;
}

// const players: Player[] = [
//   { id: 1, name: "Pladfdsfsyer 1", scores: [] },
//   { id: 2, name: "Plasdfsdfyer 2", scores: [] },
//   { id: 3, name: "Plasdsdfsdyer 3", scores: [] },
// ];

const AddPlayersScores: React.FC = () => {
  const [scores, setScores] = useState<{ [key: number]: boolean }>({});
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const getPlayersDetails = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("playersList");
        const storedRoundNumber = await AsyncStorage.getItem("roundNumber");
        const playersDetailsWithScores = await AsyncStorage.getItem(
          "playersDetailsWithScores"
        );
        if (storedRoundNumber) {
          setRoundNumber(Number(storedRoundNumber));
        }
        if (playersDetailsWithScores) {
          setPlayers(JSON.parse(playersDetailsWithScores));
        }

        if (!playersDetailsWithScores && storedPlayers) {
          const parsedPlayers: Player[] = JSON.parse(storedPlayers).map(
            (player: any, index: number) => ({
              id: index + 1,
              name: player,
              scores: player.scores || [],
              totalScores: 0,
              isInGame: true,
            })
          );

          await AsyncStorage.setItem(
            "playersDetailsWithScores",
            JSON.stringify(parsedPlayers)
          );
          setPlayers(parsedPlayers);
        }
      } catch (error) {}
    };
    getPlayersDetails();
  }, []);
  const handleCheckboxChange = (id: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [id]: !prevScores[id],
    }));
  };

  const handleScoreChange = async (id: number, score: string) => {
    const filteredText = score.replace(/[^0-9]/g, "");
    players.map((player) => {
      if (player.id === id) {
        player.scores[roundNumber] = parseInt(filteredText) || 0;
      }
    });
    setPlayers(players);
  };

  const onClickingSave = async () => {
    const hasInvalidScore = players.some(
      (player) => player.scores[roundNumber] > 101
    );
    const notHavingScore = players.some(
      (player) => player.scores[roundNumber] == undefined && player.isInGame
    );
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
    await AsyncStorage.setItem(
      "playersDetailsWithScores",
      JSON.stringify(players)
    );
    await AsyncStorage.setItem(
      "roundNumber",
      (Number(await AsyncStorage.getItem("roundNumber")) + 1).toString()
    );
    Alert.alert(
      "Bittu Nuv superrrr raaa 👌👌👌",
      "Hammayya anni enter chesav thanks ra babu",
      [
        {
          text: "OK",
          onPress: async () => {
            router.replace("/dashboard");
          },
        },
      ]
    );
  };
  const getValue = (text: string) => {
    text?.replace(/[^0-9]/g, "");
    return "";
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Players Scores</Text>
      <Text style={styles.roundNumber}>Round Number : {roundNumber + 1}</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.totalScores > 100 ? null : (
            <View style={styles.playerRow}>
              <Text style={styles.playerName}>{item.name}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Score"
                keyboardType="numeric"
                onChangeText={(text) => handleScoreChange(item.id, text)}
                value={item.scores[roundNumber]?.toString()}
              />
            </View>
          )
        }
      />
      <Button
        children="Save"
        mode="contained"
        onPress={() => {
          onClickingSave();
        }}
        style={{ backgroundColor: "#4CAF50" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  roundNumber: {
    fontSize: 14,
    paddingBottom: 10,
    fontWeight: "500",
  },
  playerRow: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  playerName: {
    fontSize: 16,
    width: "50%",
    // marginLeft: "5%",
    wordWrap: "wrap",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    width: "25%",
    height: 40,
    textAlign: "center",
  },
  checked: {
    backgroundColor: "#4CAF50",
  },
});

export default AddPlayersScores;
