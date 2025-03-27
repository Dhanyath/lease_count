// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// export default function AddPlayersDetails() {
//   const [noOfPlayers, setNoOfPlayers] = useState(0);
//   useEffect(() => {
//     const getPlayersCountNumber = async () => {
//       try {
//         const storedPlayers = await AsyncStorage.getItem("playersCount");
//         if (storedPlayers) {
//           setNoOfPlayers(Number(storedPlayers));
//         }
//       } catch (error) {
//         console.error("Error loading match state:", error);
//       }
//     };
//     getPlayersCountNumber();
//   }, []);
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>AddPlayersDetails {noOfPlayers}</Text>
//     </View>
//   );
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Player } from "./addplayersscores";

export default function AddPlayersDetails() {
  const [noOfPlayers, setNoOfPlayers] = useState(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getPlayersCountNumber = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("playersCount");
        if (storedPlayers) {
          setNoOfPlayers(Number(storedPlayers));
          setPlayers(new Array(Number(storedPlayers)).fill(""));
        }
      } catch (error) {
        console.error("Error loading match state:", error);
      }
    };
    getPlayersCountNumber();
  }, []);

  const handleInputChange = (text: string, index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = text;
    setPlayers(updatedPlayers);
  };

  const validatePlayers = () => {
    const regex = /^[A-Za-z.]+$/;
    let valid = true;
    let newErrors = players.map((player) =>
      regex.test(player) ? "" : "Only alphabets and '.' are allowed."
    );

    if (newErrors.some((error) => error !== "")) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async () => {
    setErrors([]);
    if (!validatePlayers()) {
      console.log("Validation Error", "Please correct invalid player names.");
      return;
    }
    const nameSet = new Set(players.map((name) => name.trim().toLowerCase())); // Normalize for case-insensitive comparison
    if (nameSet.size !== players.length) {
      console.log(
        "Validation Error",
        "Duplicate player names are not allowed."
      );
      setErrors(
        players.map((name, index) =>
          players.filter(
            (n) => n.trim().toLowerCase() === name.trim().toLowerCase()
          ).length > 1
            ? "Duplicate player name."
            : ""
        )
      );
      return;
    }

    try {
      await AsyncStorage.setItem("playersList", JSON.stringify(players));
      const parsedPlayers: Player[] = players.map(
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
      await AsyncStorage.setItem("matchStarted", "true");
      Alert.alert("Success", "Players details saved successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error saving player details:", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "white",
          // borderWidth: 1,
          // borderColor: "gray",
          width: "90%",
          marginLeft: "5%",
          marginTop: "5%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Add Players Details
        </Text>
        <Text>Total Players: {noOfPlayers}</Text>
        {Array.from({ length: noOfPlayers }).map((_, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 10, fontSize: 18 }}>
                Player {index + 1}
              </Text>
              <TextInput
                key={index}
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "gray",
                  padding: 8,
                  width: 200,
                  marginVertical: 5,
                }}
                placeholder={`Player ${index + 1} Name`}
                onChangeText={(text) => handleInputChange(text, index)}
                value={players[index] || ""}
              />
            </View>
            {errors[index] ? (
              <Text style={{ color: "red", marginTop: 5, marginLeft: "25%" }}>
                {errors[index]}
              </Text>
            ) : null}
          </View>
        ))}
        {/* <Button title="Save Players" onPress={handleSubmit} /> */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Players</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#169c52",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
