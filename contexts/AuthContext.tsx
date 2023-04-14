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
	changeIsAuth: (value: boolean) => {},
	fillUserData: (value: userDataType) => {},
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

	const changeIsAuth = (value: boolean) => {
		setIsAuthenticated(value);
		console.log('[context] isAuthenticated:', value);
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
		changeIsAuth(false);
	};
	const state = {
		isAuthenticated,
		userData,
		fillUserData,
		logUserOut,
		changeIsAuth,
	}

	return (
		<AuthContext.Provider value={state}>
			{children}
		</AuthContext.Provider>
	)
}
 
export default AuthContextProvider;
