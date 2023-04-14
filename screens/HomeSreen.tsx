import { ScrollView, StyleSheet, View } from "react-native";
import HomeCard from "../comps/home/HomeCard";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import store from "../stores/store";

const HomeScreen: React.FC = () => {
	return (
    <View style={styles.container}>
      <ScrollView >
        <HomeCard />
      </ScrollView>
    </View>
	);
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
		backgroundColor: "#fff",
  }
});
 