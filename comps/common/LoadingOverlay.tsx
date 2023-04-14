import { View, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react-lite";

const LoadingOverlay: React.FC = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size='large' />
		</View>
	);
}
 
export default observer(LoadingOverlay);
// export default LoadingOverlay;

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