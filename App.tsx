import { SafeAreaView, StyleSheet, Alert, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import AuthContextProvider from './contexts/AuthContext';
import { useEffect } from "react";
import store from './stores/store';
import LoadingOverlay from './comps/common/LoadingOverlay';
import { observer } from 'mobx-react-lite';
import * as Notifications from 'expo-notifications';
import { getData } from './utils/asyncStorage';
import {StatusBar} from 'expo-status-bar'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    const dataFromAsyncStorage = await getData();
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: !!dataFromAsyncStorage,
    }
  }
})

const App = () => {
  useEffect(() => {
    const configurePushNotifications = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (finalStatus != 'granted') {
          const { status } = await  Notifications.requestPermissionsAsync();
          let finalStatus = status;
        }
        if (finalStatus != 'granted') {
          Alert.alert(
            'Permission required',
            'Push notifications need it',
          );
          return;
        }
        const pushToken = await Notifications.getExpoPushTokenAsync();//get push token for a devide
        console.log(pushToken);
        if (Platform.OS == 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT,
          });
        }
      } catch (err) {
        console.warn({ err });
      }
    }
    configurePushNotifications();

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
        <StatusBar style="dark" />
      </AuthContextProvider>

      {store.isLoading && <LoadingOverlay />}
    </>
  );
}

export default observer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
