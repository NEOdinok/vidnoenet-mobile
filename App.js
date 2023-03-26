import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { HomeCard } from './comps';
import { useState } from 'react';
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { COLORS } from './constants';
// import SafeAreaView from 'react-native-safe-area-view';

export default function App() {
  const [loaded] = useFonts({
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <ScrollView>
        <HomeCard />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
