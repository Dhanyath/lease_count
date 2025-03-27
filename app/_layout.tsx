import { Stack } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./dashboard";
import { Button, Text, View } from "react-native";

export default function RootLayout() {
  const Drawer = createDrawerNavigator();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addplayersdetails"
        options={{
          title: "Add Players",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#169c52" },
        }}
      />
      <Stack.Screen
        name="addplayersscores"
        options={{
          title: "Add Scores",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#169c52" },
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fullscorecard"
        options={{
          title: "Full Scorecard",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#169c52" },
        }}
      />
      <Stack.Screen
        name="removeplayer"
        options={{
          title: "Remove Player",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#169c52" },
        }}
      />
      <Stack.Screen
        name="editscores"
        options={{
          title: "Edit Scores",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#169c52" },
        }}
      />
    </Stack>
  );
}

// import { Drawer } from "expo-router/drawer";
// import CustomDrawer from "./custom_drawer";

// export default function RootLayout() {
//   return (
//     // <Drawer>
//     //   <Drawer.Screen name="index" options={{ title: "Index" }} />
//     //   {/* <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} /> */}
//     // </Drawer>

//     <Drawer
//       drawerContent={(props) => (
//         <CustomDrawer children={undefined} {...props} />
//       )}
//     >
//       <Drawer.Screen
//         name="index"
//         options={{
//           title: "Score Tracker",
//           headerStyle: { backgroundColor: "#169c52" },
//           headerTitleStyle: { color: "white" },
//         }}
//       />
//     </Drawer>
//   );
// }
