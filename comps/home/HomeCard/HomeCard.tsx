import {
	TouchableOpacity,
	Text,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native";

import styles from './home-card';

const HomeCard = () => {
	const isLoading = false;
	const error = false;

	return (
		<TouchableOpacity
			style={styles.container}
		>
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
		</TouchableOpacity>
	);
}
 
export default HomeCard;