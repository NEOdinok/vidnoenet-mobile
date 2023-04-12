import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import AuthContextProvider from './contexts/AuthContext';
import { useContext, useEffect, useLayoutEffect} from "react";
import { AuthContext } from './contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { getData, storeData } from './utils/asyncStorage';
import { LoginUserFunctionType, userDataType } from './types/userDataType';
import axios from "axios";
import qs from "qs";
import * as cheerio from 'cheerio';

export default function App() {
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
				// 'Cookie': AuthCtx.userData.sessionCookie? AuthCtx.userData.sessionCookie: '', 
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

	const submitHandler = async (res: userDataType | undefined) => {
		if (res) {
			AuthCtx.fillUserData(res);
			AuthCtx.toggleAuthState();
		} else {
			Alert.alert('Пожалуйста, проверьте правильность данных');
			return;
		}
	}

  useEffect(() => {
    async function initial() {
      const dataFromAsyncStorage = await getData();
      console.log('[app.tsx]', dataFromAsyncStorage);
      if (dataFromAsyncStorage) {
        const res = await loginUser(dataFromAsyncStorage.login, dataFromAsyncStorage.password);
        submitHandler(res);
      };
    }
    initial();
  }, []);

  const [fontsLoaded] = useFonts({
    'DMBold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMMedium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMRegular': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <AuthContextProvider>
        <SafeAreaView style={styles.container} >
          <Navigation />
        </SafeAreaView>
      </AuthContextProvider>

      {/* {AuthCtx.isLoading && <LoadingOverlay />} */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
