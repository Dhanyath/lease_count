// import {
//   Alert,
//   Button,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Header from "./Header";
// import PlayersCard from "./MainContent/PlayersCard";
// import MenuCard from "./MainContent/MenuCard";
// import { useState } from "react";

// export default function Dashboard() {
//   const [isMatchStarted, setIsMatchStarted] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [number, setNumber] = useState("");

//   const playersList = [];
//   const onStartMatchButtonClicked = () => {
//     setIsModalVisible(true);
//   };

//   const handleInputChange = (text: string) => {
//     const filteredText = text.replace(/[^0-9]/g, "");
//     setNumber(filteredText);
//   };

//   const onClickingAddButton = () => {
//     console.log(number);
//     if (Number(number) > 10) {
//       Alert.alert(
//         "!!!Danger!!!",
//         "Oreyyy Thuppas yedava 10 players kanna takkuva enter chey"
//       );
//     } else {
//       setIsModalVisible(false);
//       setIsMatchStarted(true);
//     }
//   };
//   return (
//     <>
//       <Header title="Score Tracker" />
//       {isMatchStarted}
//       {isMatchStarted ? (
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//           <PlayersCard />
//           <MenuCard />
//           <View style={{ height: 20 }}></View>
//         </ScrollView>
//       ) : (
//         <>
//           <Text
//             style={{
//               textAlign: "center",
//               marginTop: "45%",
//               padding: 10,
//               fontSize: 18,
//             }}
//           >
//             Oops!!!!!No Match Started. Click the button below to start a new
//             match
//           </Text>
//           <View style={styles.buttonContainer}>
//             <Button
//               title="Start Match"
//               onPress={() => onStartMatchButtonClicked()}
//               color="green"
//             />
//           </View>
//         </>
//       )}
//       {/* Popup Modal */}
//       <Modal visible={isModalVisible} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>
//               Please enter number Of players in the game
//             </Text>
//             <TextInput
//               placeholder="Number of players"
//               keyboardType="number-pad"
//               value={number}
//               onChangeText={handleInputChange}
//               style={styles.input}
//             />
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-around" }}
//             >
//               <TouchableOpacity
//                 onPress={() => onClickingAddButton()}
//                 style={styles.addButton}
//               >
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setIsModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     width: 200, // Set button width
//     alignSelf: "center", // Center the button
//     borderRadius: 10, // Rounded corners
//     overflow: "hidden", // Ensures border radius applies
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
//   },
//   modalContainer: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "80%",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: "green",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     margin: 10,
//   },
//   closeButton: {
//     backgroundColor: "red",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     margin: 10,
//   },
//   addButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     paddingLeft: "25%",
//     paddingRight: "25%",
//     marginBottom: 10,
//   },
// });

import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Components/Header";
import PlayersCard from "./Components/MainContent/PlayersCard";
import MenuCard from "./Components/MainContent/MenuCard";
import { useState, useEffect } from "react";
import { Navigator, useRouter } from "expo-router";

export default function Dashboard() {
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadMatchState = async () => {
      try {
        const storedMatchState = await AsyncStorage.getItem("matchStarted");
        const storedPlayers = await AsyncStorage.getItem("playersCount");

        console.log("Stored Match State:", storedMatchState);
        if (storedMatchState === "true") {
          setIsMatchStarted(true);
        }

        if (storedPlayers) {
          setNumber(storedPlayers);
        }
      } catch (error) {
        console.error("Error loading match state:", error);
      }
    };
    loadMatchState();
  }, []);

  const onStartMatchButtonClicked = () => {
    setIsModalVisible(true);
  };

  const handleInputChange = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, "");
    setNumber(filteredText);
  };

  const onClickingAddButton = async () => {
    if (Number(number) == 0) {
      Alert.alert(
        "Warning",
        "Arey players lekunda endhuku ra neeku e app. Oka pani chey........"
      );
      return;
    }
    if (Number(number) == 1) {
      Alert.alert(
        "Warning",
        "Arey asala okkadive ela adathav ra e game. Poi vere vaalani teesukuni raa appudu aadukovachu."
      );
      return;
    }
    if (Number(number) > 10) {
      Alert.alert(
        "!!!Danger!!!",
        "Oreyyy Thuppas yedava 10 players kanna takkuva enter chey"
      );
    } else {
      if (number === "") {
        Alert.alert(
          "!!!Danger!!!",
          "Budhi undha anni musukuni number enter chey"
        );
        return;
      }
      try {
        await AsyncStorage.setItem("playersCount", number);

        setIsModalVisible(false);
        router.push("/addplayersdetails");
      } catch (error) {
        console.error("Error saving match state:", error);
      }
    }
  };

  const onClickingCloseButton = async () => {
    setNumber("");
    await AsyncStorage.removeItem("playersCount");
    setIsModalVisible(false);
  };
  return (
    <>
      <Header title="Score Tracker" />
      {isMatchStarted ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
        >
          <PlayersCard />
          <MenuCard />
          <View style={{ height: 20 }}></View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: "45%",
              padding: 10,
              fontSize: 18,
            }}
          >
            Oops!!!!!No Match Started. Click the button below to start a new
            match
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onStartMatchButtonClicked}
            >
              <Text style={styles.buttonText}>Start Match</Text>
            </TouchableOpacity>
          </View>
          {/* <Button
              title="Get Async Storage Data"
              onPress={async () => {
                const storedPlayers = await AsyncStorage.getItem(
                  "playersCount"
                );
              }}
            /> */}
          {/* </View> */}
        </View>
      )}
      {/* Popup Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Please enter number Of players in the game
            </Text>
            <TextInput
              placeholder="Number of players"
              keyboardType="number-pad"
              value={number}
              onChangeText={handleInputChange}
              style={styles.input}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={onClickingAddButton}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClickingCloseButton()}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// const styles = StyleSheet.create({
//   buttonContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   button: {
//     backgroundColor: "green",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5, // Shadow for Android
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "80%",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: "green",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     margin: 10,
//   },
//   closeButton: {
//     backgroundColor: "red",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     margin: 10,
//   },
//   addButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     paddingLeft: "25%",
//     paddingRight: "25%",
//     marginBottom: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#169c52",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    margin: 10,
  },
  closeButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    margin: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: "90%",
    textAlign: "center",
    marginBottom: 15,
  },
});
