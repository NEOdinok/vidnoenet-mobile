import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingOverlay: React.FC = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size='large' />
		</View>
	);
}
 
export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
		backgroundColor: '#F5FCFF88',
  },
})