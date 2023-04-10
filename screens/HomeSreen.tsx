import { ScrollView, StyleSheet, View } from "react-native";
import HomeCard from "../comps/home/HomeCard";

const HomeScreen: React.FC = () => {
	return (
    // contentContainerStyle={styles.container}
    <View style={styles.container}>
      <ScrollView >
        <HomeCard />
      </ScrollView>
    </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
		backgroundColor: "#fff",
  }
});
 
export default HomeScreen;