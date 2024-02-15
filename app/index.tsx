import { LogoTitle } from "@/components/LogoTitle";
import TodoScreen from "@/components/TodoScreen";
import { Stack } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#DEDEDE" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#E490FD" },
          headerTitleAlign: "center",
          headerTitle: "Todo List",
          headerTitleStyle: { color: "#FEFEFE" },
        }}
      />
      <TodoScreen />
    </SafeAreaView>
  );
};

export default Home;
