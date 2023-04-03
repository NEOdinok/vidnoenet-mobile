import { Pressable, View, Text, StyleSheet } from "react-native";
import { SPACING, COLORS, FONT, SIZES } from "../../constants";
import { Platform } from "react-native";

interface Props {
	text: string,
	onPress: () => void,
}

const PrimaryBtn: React.FC<Props> = ({ text, onPress }) => {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => [
					styles.innerContainer,
					pressed ? styles.btnPressed : null,
				]}
				android_ripple={{color: COLORS.primaryRipple}}
			>
					<Text style={styles.text}>{text}</Text>
			</Pressable>
		</View>
	);
}

export default PrimaryBtn;

const styles = StyleSheet.create({
	container: {
	  borderRadius: SPACING,
		elevation: 4,
		shadowColor: COLORS.primary,
		shadowOpacity: .3,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		overflow: 'hidden',
	},
	innerContainer: {
		padding: SPACING*2,
		backgroundColor: COLORS.primary,
	},
	text: {
		color: '#fff',
		fontFamily: FONT.bold,
		fontSize: SIZES.medium,
		textAlign: 'center',
	},
	btnPressed: {
		opacity: .6,
	},
});