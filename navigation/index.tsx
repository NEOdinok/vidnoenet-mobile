import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeSreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import IconBtn from '../comps/common/LogOutBtn';
import store from '../stores/store';
import { observer } from 'mobx-react-lite';

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

const Navigation = () => {
	const AuthCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{store.isAuthenticated && <AuthenticatedStack />}
			{!store.isAuthenticated && <LoginStack />}
		</NavigationContainer>
	);
}

export default observer(Navigation);
