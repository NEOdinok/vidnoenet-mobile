import {
	Text,
	View,
	Pressable,
	Platform,
} from "react-native";
import { FONT, COLORS, SHADOWS, SIZES  } from "../../constants";
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
					<Text style={[styles.cardText, styles.cardSmallHeader]}>Баланс на счете:</Text>
					<Text style={[styles.cardText, styles.balance]}>450 ₽</Text>

					<View style={[styles.rateDataContainer]}>
						<View>
							<Text style={[styles.cardText, styles.cardSmallHeader]}>Тариф:</Text>
							<Text style={[styles.cardText]}>'Сотрудник'</Text>
						</View>
						<View>
							<Text style={[styles.cardText, styles.cardSmallHeader]}>Оплачен до:</Text>
							<Text style={[styles.cardText]}>1 апреля</Text>
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
	cardText: {
		color: '#333',
    fontSize: SIZES.large,
	},
	balanceHeader: {
    // fontFamily: "DMRegular",
	},
	balance: {
		fontSize: 50,
		paddingBottom: 40,
		// fontFamily: "DMBold"
	},
	cardSmallHeader: {
    // fontFamily: "DMRegular",
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