import {
	Text,
	View,
	Pressable,
	Platform,
} from "react-native";
import { FONT, COLORS, SPACING, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const HomeCard = () => {
	return (
		<View style={styles.container}>
			<Pressable
				style={({ pressed }) => [
					styles.pressableContainer,
					pressed ? styles.btnPressed : null,
				]}
				android_ripple={{color: '#ccc'}}
			>
				<View style={styles.innerContainer}>
					<Text style={[ styles.headerText ]}>Баланс на счете:</Text>
					<Text style={[styles.text, styles.balanceText]}>450 ₽</Text>

					<View style={[styles.rateDataContainer]}>
						<View>
							<Text style={[ styles.headerText ]}>Тариф:</Text>
							<Text style={[ styles.text]}>'Сотрудник'</Text>
						</View>
						<View>
							<Text style={[ styles.headerText ]}>Оплачен до:</Text>
							<Text style={[styles.text]}>1 апреля</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    borderRadius: SIZES.medium,
		margin: 16,
		elevation: 4,
		shadowColor: 'black',
		shadowOpacity: .3,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		backgroundColor: 'white',
		overflow: Platform.OS == 'android' ? 'hidden': 'visible',
	},
	btnPressed: {
		opacity: .6,
	},
	pressableContainer: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
    padding: SIZES.xLarge,
		borderRadius: SIZES.medium,
	},
	text: {
    fontSize: SIZES.large,
		fontFamily: FONT.regular,
	},
	balanceText: {
		fontSize: 50,
		paddingBottom: 40,
		fontFamily: FONT.bold,
	},
	headerText: {
    fontFamily: FONT.regular,
		fontSize: SIZES.medium,
	},
	rateDataContainer: {
		flexDirection: 'row',
		width: '100%',
		flex: 1,
		justifyContent: 'space-between',
	}
});
 
export default HomeCard;