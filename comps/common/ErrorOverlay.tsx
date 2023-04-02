import { View, Text, StyleSheet } from "react-native";

interface Props {
	message: string,
}

const LoadingOverlay: React.FC<Props> = ({ message }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>Error occured</Text>
			<Text style={styles.text}>{message}</Text>
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
	},
	text: {
		textAlign: 'center',
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
	},
	message: {
		fontSize: 14,
	}
})