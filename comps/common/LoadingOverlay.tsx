import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const LoadingOverlay = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
		</View>
	);
}
 
export default LoadingOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
    backgroundColor: '#fff',
	}
})