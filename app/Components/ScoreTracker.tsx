import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

interface Score {
  round: string;
  scores: number[];
}

const players: string[] = ["George", "Lily", "Jacob"];
const initialScores: Score[] = [
  { round: "#1", scores: [52, 4, 555] },
  { round: "#2", scores: [56, -4, 73] },
  { round: "#3", scores: [469, 541, 33] },
  { round: "#4", scores: [55, 0, 80] },
  { round: "#5", scores: [18, 25, 88] },
];

export default function ScoreTracker(): JSX.Element {
  const [scores, setScores] = useState<Score[]>(initialScores);

  const renderItem = ({ item, index }: { item: Score; index: number }) => (
    <View style={styles.row}>
      <View style={styles.fixedColumn}>
        <Text style={styles.fixedText}>{players[index]}</Text>
      </View>
      <ScrollView horizontal>
        <View style={styles.scrollableRow}>
          {item.scores.map((score, idx) => (
            <Text key={idx} style={styles.cell}>
              {score}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.fixedColumn}>
          <Text style={styles.headerText}>Players</Text>
        </View>
        <ScrollView horizontal>
          <View style={styles.scrollableHeader}>
            {initialScores.map((_, index) => (
              <Text key={index} style={styles.headerCell}>
                Round {index + 1}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Score Table */}
      <FlatList
        data={scores}
        keyExtractor={(item) => item.round}
        renderItem={renderItem}
      />

      {/* Game Label */}
      <Text style={styles.gameText}>Game 1</Text>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Add new score")}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <MaterialIcons name="menu" size={28} color="white" />
        <Entypo name="line-graph" size={28} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },

  // Header styles
  header: {
    flexDirection: "row",
    backgroundColor: "darkgreen",
    padding: 10,
    alignItems: "center",
  },
  fixedColumn: { width: 100, alignItems: "center", justifyContent: "center" },
  headerText: { color: "white", fontWeight: "bold" },
  scrollableHeader: { flexDirection: "row" },
  headerCell: {
    width: 100,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  // Row styles
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ddd" },
  scrollableRow: { flexDirection: "row" },
  fixedText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

  // Score cell styles
  cell: { width: 100, textAlign: "center", fontSize: 16, padding: 10 },

  // Game Label
  gameText: { padding: 10, fontSize: 16, fontWeight: "bold" },

  // Floating Action Button
  fab: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "darkgreen",
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "darkgreen",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
