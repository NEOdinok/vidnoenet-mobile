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
import { useState } from "react";
import PrimaryBtn from "../comps/common/PrimaryBtn";
import PrimaryInput from "../comps/common/PrimaryInput";
import { loginUser } from "../utils/login";
import { userDataType } from "../types/userDataType";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const LoginScreen: React.FC = () => {
	const [number, setNumber] = useState('');
	const [password, setPassword] = useState('');
	const numberMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/];
	const numberIsValid = number.length > 0;
	const passwordIsValid = number.length > 0;
	const AuthCtx = useContext(AuthContext);

	const validateLoginAndPassword = async () => {
		AuthCtx.toggleIsLoading();

		if (!numberIsValid || !passwordIsValid) {
			Alert.alert('Введите номер договора и пароль');
			AuthCtx.toggleIsLoading();
			return;
		} else {
			const res = await loginUser(number, password)//resolves to userDataType | undefined
			submitHandler(res);
		}
	}

	const submitHandler = async (res: userDataType | undefined) => {
		if (res) {
			AuthCtx.fillUserData(res);
			AuthCtx.toggleAuthState();
			AuthCtx.toggleIsLoading();
		} else {
			AuthCtx.toggleIsLoading();
			Alert.alert('Пожалуйста, проверьте правильность данных');
			return;
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.loginHeader}>Добро пожаловать</Text>
				{/* <Text style={styles.loginSubheader}>Вход в систему</Text> */}
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