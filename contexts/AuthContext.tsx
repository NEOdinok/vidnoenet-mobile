import { ReactNode, createContext, useState } from "react"
import { userDataType } from "../types/userDataType";
import { clearData } from "../utils/asyncStorage";

export const AuthContext = createContext({
	isAuthenticated: false,
	userData: {
		balance: '',
		accountNumber: '',
		tariffName: '',
		validUntilMonth: '',
		validUntilDate: '',
		sessionCookie: '',
	},
	toggleAuthState: () => {},
	fillUserData: (data: userDataType) => {},
	logUserOut: () => {},
});

interface AuthContextProps {
	children: ReactNode,
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userData, setUserData] = useState({
		balance: '',
		accountNumber: '',
		tariffName: '',
		validUntilMonth: '',
		validUntilDate: '',
		sessionCookie: '',
	});
	const toggleAuthState = () => {
		setIsAuthenticated(!isAuthenticated);
		console.log('changed auth state: ', isAuthenticated)
	};
	const fillUserData = (data: userDataType) => setUserData(data);
	const logUserOut = () => {
		setUserData({
			balance: '',
			accountNumber: '',
			tariffName: '',
			validUntilMonth: '',
			validUntilDate: '',
			sessionCookie: '',
		});
		clearData();
		toggleAuthState();
	};
	const state = {
		isAuthenticated,
		userData,
		fillUserData,
		logUserOut,
		toggleAuthState,
	}

	return (
		<AuthContext.Provider value={state}>
			{children}
		</AuthContext.Provider>
	)
}
 
export default AuthContextProvider;
