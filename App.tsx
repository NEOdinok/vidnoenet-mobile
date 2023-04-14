import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import AuthContextProvider from './contexts/AuthContext';
import { useEffect } from "react";
import store from './stores/store';
import LoadingOverlay from './comps/common/LoadingOverlay';
import { observer } from 'mobx-react-lite';

const App = () => {
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
