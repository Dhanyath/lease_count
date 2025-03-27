import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "./addplayersscores";

const FullScoreboard: React.FC = () => {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [roundNumber, setRoundNumber] = React.useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    const getAllDetails = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("playersCount");
        const playerDetailsWithScores = await AsyncStorage.getItem(
          "playersDetailsWithScores"
        );
        const storedRoundNumber = await AsyncStorage.getItem("roundNumber");
        if (storedRoundNumber) {
          setRoundNumber(Number(storedRoundNumber));
        }
        if (playerDetailsWithScores) {
          setPlayers(JSON.parse(playerDetailsWithScores));
        }
      } catch (error) {
        console.error("Error loading match state:", error);
      }
    };
    getAllDetails();
  }, []);
  return roundNumber > 0 ? (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Full Scoreboard</Text>
        <View style={styles.tableContainer}>
          <View style={styles.nameColumn}>
            <Text style={styles.header}>Player Name</Text>
            {players.map((player) => (
              <Text key={player.id} style={styles.playerName}>
                {player.name}
              </Text>
            ))}
          </View>
          <ScrollView horizontal>
            <View>
              <View style={styles.scoresRow}>
                {Array.from({ length: roundNumber }).map((_, index) => (
                  <Text key={index} style={styles.roundHeader}>{`R${
                    index + 1
                  }`}</Text>
                ))}
              </View>
              {players.map((player) => (
                <View key={player.id} style={styles.scoresRow}>
                  {Array.from({ length: roundNumber }).map((_, index) => (
                    <Text key={index} style={styles.score}>
                      {isNaN(player.scores[index]) ? "-" : player.scores[index]}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.matchStatus}>
        Game in progress, waiting for the round to start.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tableContainer: {
    flexDirection: "row",
  },

  nameColumn: {
    marginTop: "3%",
    width: "40%",
  },
  playerName: {
    fontSize: 18,
    // fontWeight: "bold",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  roundNumber: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
  },
  scoresRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    // borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  score: {
    fontSize: 18,
    width: 50,
    textAlign: "center",
  },
  totalScore: {
    fontSize: 18,
    width: 70,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
    // marginBottom: 5,
  },
  roundHeader: {
    fontSize: 18,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  totalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    width: 70,
    textAlign: "center",
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  matchStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default FullScoreboard;
