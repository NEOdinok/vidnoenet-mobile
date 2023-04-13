import { 
	View, 
	Text, 
	StyleSheet, 
	KeyboardAvoidingView, 
	Keyboard, 
	TouchableWithoutFeedback,
	Alert
} from "react-native";
import { SIZES, COLORS, FONT, SPACING } from "../constants";
import { useState, useEffect } from "react";
import PrimaryBtn from "../comps/common/PrimaryBtn";
import PrimaryInput from "../comps/common/PrimaryInput";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { getData, storeData } from "../utils/asyncStorage";
import axios from "axios";
import qs from "qs";
import * as cheerio from 'cheerio';
import { userDataType, LoginUserFunctionType } from "../types/userDataType";

const LoginScreen: React.FC = () => {
	const [number, setNumber] = useState('');
	const [password, setPassword] = useState('');
	const numberMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/];
	const numberIsValid = number.length > 0;
	const passwordIsValid = number.length > 0;
	const AuthCtx = useContext(AuthContext);

	const loginUser: LoginUserFunctionType = async (login, password) => {
		const userData: userDataType = {
			balance: '',
			accountNumber: '',
			tariffName: '',
			validUntilMonth: '',
			validUntilDate: '',
			sessionCookie: '',
		}

		let data = qs.stringify({
			'action_id': 'AUTH',
			'login': login,
			'password': password
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://lk.vidnoe.net/',
			headers: { 
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0', 
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
				'Accept-Language': 'en-US,en;q=0.5', 
				'Accept-Encoding': 'gzip, deflate, br', 
				'Referer': 'https://lk.vidnoe.net/', 
				'Content-Type': 'application/x-www-form-urlencoded', 
				'Origin': 'https://lk.vidnoe.net', 
				'Connection': 'keep-alive', 
				'Upgrade-Insecure-Requests': '1', 
				'Sec-Fetch-Dest': 'document', 
				'Sec-Fetch-Mode': 'navigate', 
				'Sec-Fetch-Site': 'same-origin',
				'Cookie': AuthCtx.userData.sessionCookie? AuthCtx.userData.sessionCookie: '', 
			},
			data : data
		};

		try {
			const response = await axios.request(config);
			const htmlSTRING = JSON.stringify(response.data);
			const responseCookie = response.headers["set-cookie"]? response.headers["set-cookie"][0]: '';

			if (htmlSTRING.includes('Неправильный логин или пароль')) {
				return undefined;
			} else {
				const $ = cheerio.load(response.data, null, false);
				//find the data
				const data = $('div.cell.col-lg-3.col-md-12').find('.info-value').text();
				//remove all spaces
				const data1 = data.toString().replace(/\s/g,'')// remove all spaces
				//apply regex to create an array
				const regex = /(\D+)|(\d+)/g;
				const result: string[] = data1.match(regex)!;
				//fill userData obj
				userData.balance = result[0]+result[1];
				userData.accountNumber = result[2]+result[3]+result[4]
				userData.tariffName = result[5].slice(1, result[5].length - 1);
				userData.validUntilMonth= result[6];
				userData.validUntilDate = result[7];
				userData.sessionCookie = responseCookie;
				storeData({
					login, 
					password,
					cookie: responseCookie
				});
			}
		} catch (err) {
			console.warn({ err });
		}

		return userData;
	}

	const validateLoginAndPassword = async () => {
		console.log('LOADING...');
		if (!numberIsValid || !passwordIsValid) {
			Alert.alert('Введите номер договора и пароль');
			return;
		} else {
			const res = await loginUser(number, password);
			submitHandler(res);
		}
	}

	const submitHandler = (res: userDataType | undefined) => {
		if (res) {
			AuthCtx.fillUserData(res);
			AuthCtx.changeIsAuth(true);
		} else {
			Alert.alert('Пожалуйста, проверьте правильность данных');
			return;
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.loginHeader}>Добро пожаловать</Text>
			</View>
			
			<KeyboardAvoidingView style={styles.inputsContainer}>
				<PrimaryInput
					value={number}
					setValue={setNumber}
					mask={numberMask}
					placeholder="123.123"
					keyboardType="number-pad"
					maxLength={7}
					autoCorrect={false}
					label="Номер договора"
				/>

				<PrimaryInput
					value={password}
					setValue={setPassword}
					placeholder="Введите пароль"
					keyboardType="default"
					secureTextEntry={true}
					autoCorrect={false}
					label="Пароль"
				/>
			</KeyboardAvoidingView>
		
			<View style={styles.btnContainer}>
				<PrimaryBtn text="Войти" onPress={validateLoginAndPassword}/>
			</View>
		</View>
		</TouchableWithoutFeedback>
	);
}
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING*2,
		backgroundColor: "#fff",
		justifyContent: 'center',
	},
	headerContainer: {
		alignItems: 'center',
	},
	loginHeader: {
		fontSize: SIZES.xLarge,
		color: COLORS.primary,
		fontFamily: FONT.bold,
		marginVertical: SPACING,
	},
	loginSubheader: {
		fontFamily: FONT.medium,
		fontSize: SIZES.large,
		maxWidth: '60%',
		textAlign: 'center',
	},
	inputsContainer: {
		marginVertical: SPACING*2,
	},

	btnContainer: {
		marginVertical: SPACING*3,
	}
});

export default LoginScreen;