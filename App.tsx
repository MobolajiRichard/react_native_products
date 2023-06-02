import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import Products from "./components/Product";
import { useFonts } from "expo-font";
import { FONTS } from "./constant";

export default function App() {
  //register fonts
  const [fontsLoaded] = useFonts({
    outfit_light: FONTS.outfit_light,
    outfit_medium: FONTS.outfit_medium,
    outfit_regular: FONTS.outfit_regular,
  });

  //return a loading indicator if font's is still loading
  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" style="dark" />
      <Products />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
