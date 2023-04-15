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
// import axios from "axios";
// import qs from "qs";
// import * as cheerio from 'cheerio';
import { userDataType } from "../types/userDataType";
import { observer } from 'mobx-react-lite';
import { loginUser, testOldCookie } from "../utils/auth";
import store from "../stores/store";

const LoginScreen: React.FC = () => {
	const [number, setNumber] = useState('');
	const [password, setPassword] = useState('');
	const numberMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/];
	const numberIsValid = number.length > 0;
	const passwordIsValid = number.length > 0;
	const AuthCtx = useContext(AuthContext);

	const validateLoginAndPassword = async () => {
		console.log('LOADING...');
		store.changeIsLoading(true);

		if (!numberIsValid || !passwordIsValid) {
			Alert.alert('Введите номер договора и пароль');
			return;
		} else {
			const res = await loginUser(number, password);
			submitHandler(res);
		}
	}

	const submitHandler = (res: userDataType | undefined) => {
		console.log('[login.tsx] runs submit')
		if (res) {
			AuthCtx.fillUserData(res);
			// store.fillUserData(res);// does not work

			store.changeIsAuth(true);

			store.changeIsLoading(false);
		} else {
			Alert.alert('Пожалуйста, проверьте правильность данных');
			return;
		}
	}

  useEffect(() => {
    async function initial() {
			console.log('[login.tsx] store isAuthenticated', store.isAuthenticated);
			console.log('[login.tsx] store userData', store.userData);
      const dataFromAsyncStorage = await getData();
      console.log('[login.tsx] got asyncStorage data', dataFromAsyncStorage);
			if (dataFromAsyncStorage) {
				store.changeIsLoading(true);
				const res = await loginUser(dataFromAsyncStorage.login, dataFromAsyncStorage.password);
				// const res = await testOldCookie(dataFromAsyncStorage.login, dataFromAsyncStorage.password);
				if (res) submitHandler(res);
			}
		}

    initial();
  }, []);

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

export default observer(LoginScreen);
 
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

