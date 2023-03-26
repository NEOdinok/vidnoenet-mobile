import { StyleSheet } from "react-native";
import { FONT, COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
    textAlign: 'center',
    padding: SIZES.xLarge,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
		borderColor: '#333',
		borderWidth: 1.5,
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
	},
	cardText: {
		color: '#333',
    fontSize: SIZES.large,
	},
	balanceHeader: {
    fontFamily: "DMRegular",
	},
	balance: {
		fontSize: 50,
		paddingBottom: 40,
		fontFamily: "DMBold"
	},
	cardSmallHeader: {
    fontFamily: "DMRegular",
		fontSize: SIZES.medium,
	},
	rateDataContainer: {
		flexDirection: 'row',
		width:'100%',
		flex:1,
		justifyContent: 'space-between',
	}
});

export default styles;
