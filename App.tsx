import { useState, useEffect, useCallback } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeSreen';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Navigation from './navigation';

const Stack = createStackNavigator();
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'DMBold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMMedium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMRegular': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} >
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
