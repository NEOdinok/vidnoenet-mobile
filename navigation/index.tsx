import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeSreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	)
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}
