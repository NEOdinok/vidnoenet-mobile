import { StoreDataFunctionType, GetDataFunctionType } from "../types/userDataType"
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData: StoreDataFunctionType = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userCredentials', jsonValue);
  } catch (err) {
		console.warn({err});
  }
}

const clearData = async () => {
  try {
   await AsyncStorage.setItem('userCredentials', '');
   await AsyncStorage.removeItem('userCredentials');
  } catch (err) {
		console.warn({err});
  }
}

const getData: GetDataFunctionType = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userCredentials');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
		console.warn({err});
  }
}

export {
	storeData,
	getData,
  clearData,
}