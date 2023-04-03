import { ScrollView, StyleSheet, View } from "react-native";
import HomeCard from "../comps/home/HomeCard";

const HomeScreen: React.FC = () => {
	return (
  // contentContainerStyle={styles.container}
    <ScrollView >
      <HomeCard />
    </ScrollView>
	);
}

const styles = StyleSheet.create({
  // container: {
    // flex: 1,
    // justifyContent: 'center',
    // maxWidth: '100%',
  // }
});
 
export default HomeScreen;