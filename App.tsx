

import { StatusBar as Bar} from "expo-status-bar";
import { ActivityIndicator, StyleSheet, SafeAreaView, StatusBar , Platform, Dimensions} from "react-native";
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

  console.log(Platform.OS)

  return (
    <SafeAreaView style={styles.container}>
      <Bar backgroundColor="white" style="dark" />
      <Products />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? StatusBar?.currentHeight : 0,
    height:Dimensions.get('window').height
  }
});
