import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import AuthContextProvider from './contexts/AuthContext';
import { useContext } from "react";
import { AuthContext } from './contexts/AuthContext';
import LoadingOverlay from './comps/common/LoadingOverlay';

export default function App() {
  const AuthCtx = useContext(AuthContext);

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

      {AuthCtx.isLoading && <LoadingOverlay />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
