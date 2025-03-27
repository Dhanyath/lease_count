import { Player } from "@/app/addplayersscores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, DataTable, Text } from "react-native-paper";

export default function PlayersCard() {
  const [playersDetails, setPlayersDetails] = useState<Player[]>([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getPlayersDetails = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("playersList");
        const storedPlayersWithScores = await AsyncStorage.getItem(
          "playersDetailsWithScores"
        );
        const storedRoundNumber = await AsyncStorage.getItem("roundNumber");
        if (storedRoundNumber) {
          setRoundNumber(Number(storedRoundNumber));
        }
        if (storedPlayersWithScores) {
          setPlayersDetails(
            JSON.parse(storedPlayersWithScores).sort(
              (a: Player, b: Player) => b.totalScores - a.totalScores
            )
          );
          // Check if only one player is still in the game
          const activePlayers = JSON.parse(storedPlayersWithScores).filter(
            (player: Player) => player.isInGame
          );

          if (activePlayers.length === 1) {
            const winner = activePlayers[0];
            Alert.alert(
              "The game has ended!",
              "Winner of the game is: " + winner.name,
              [
                {
                  text: "End Game",
                  onPress: async () => {
                    await AsyncStorage.clear();
                    router.replace("/dashboard");
                  },
                },
              ]
            );
          }
        } else if (storedPlayersWithScores === null && storedPlayers) {
          const parsedPlayers: Player[] = JSON.parse(storedPlayers).map(
            (player: any, index: number) => ({
              id: index + 1,
              name: player,
              scores: [],
              totalScores: 0,
              isInGame: true,
            })
          );
          setPlayersDetails(parsedPlayers);
        }
      } catch (error) {}
    };
    getPlayersDetails();
  }, []);
  return (
    <Card style={styles.container}>
      <Card.Title
        title="Match Status: In Progress"
        subtitle={`Number Of Rounds: ${roundNumber}`}
        titleStyle={styles.cardtitle}
        subtitleStyle={styles.cardsubtitle}
      />
      <Card.Content>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{ fontSize: 15 }}>
              Players
            </DataTable.Title>
            <DataTable.Title numeric textStyle={{ fontSize: 15 }}>
              Score
            </DataTable.Title>
          </DataTable.Header>
          {playersDetails.map((player, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <View style={{ flex: 1 }}>
                  <Text
                    style={
                      player.isInGame
                        ? styles.activePlayer
                        : styles.inActivePlayer
                    }
                  >
                    {player.name}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <View>
                  <Text
                    style={
                      player.isInGame
                        ? styles.activePlayerScore
                        : styles.inActivePlayerScore
                    }
                  >
                    {player.scores.reduce(
                      (sum, score) => sum + Number(score),
                      0
                    )}
                  </Text>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: "5%",
    borderTopRightRadius: "8%",
    borderTopLeftRadius: "8%",
    backgroundColor: "white",
  },
  cardtitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    borderColor: "black",
  },
  cardsubtitle: {
    textAlign: "center",
    fontSize: 17,
  },
  activePlayer: {
    flexWrap: "wrap",
    fontSize: 19,
  },
  inActivePlayer: {
    color: "red",
    fontSize: 19,
  },
  activePlayerScore: {
    fontSize: 17,
  },
  inActivePlayerScore: {
    color: "red",
    fontSize: 17,
  },
});
