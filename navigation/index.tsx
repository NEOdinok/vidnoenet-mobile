import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeSreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import IconBtn from '../comps/common/LogOutBtn';
import store from '../stores/store';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: true,
			headerRight: () => (
				<IconBtn />
			),
		}}>
		<Stack.Screen name="Личный кабинет" component={HomeScreen} />
	</Stack.Navigator>
)

const LoginStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
		</Stack.Navigator>
	)
}

export default function Navigation() {
	const AuthCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{/* {!(AuthCtx.isAuthenticated == true) && <LoginStack />}
			{(AuthCtx.isAuthenticated == true) && <AuthenticatedStack />} */}
			{store.isAuthenticated && <AuthenticatedStack />}
			{!store.isAuthenticated && <LoginStack />}
		</NavigationContainer>
	);
}
