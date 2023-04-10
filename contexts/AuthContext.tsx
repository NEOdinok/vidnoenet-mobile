import { ReactNode, createContext, useState } from "react"
import { userDataType } from "../types/userDataType";

export const AuthContext = createContext({
	isAuthenticated: false,
	isLoading: false,
	userData: {
		balance: '',
		accountNumber: '',
		tariffName: '',
		validUntilMonth: '',
		validUntilDate: '',
	},
	toggleAuthState: () => {},
	fillUserData: (data: userDataType) => {},
	logUserOut: () => {},
	toggleIsLoading: () => {},
});

interface AuthContextProps {
	children: ReactNode,
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({
		balance: '',
		accountNumber: '',
		tariffName: '',
		validUntilMonth: '',
		validUntilDate: '',
	});
	const toggleAuthState = () => setIsAuthenticated(!isAuthenticated);
	const toggleIsLoading = () => setIsLoading(!isLoading);
	const fillUserData = (data: userDataType) => setUserData(data);
	const logUserOut = () => {
		setUserData({
			balance: '',
			accountNumber: '',
			tariffName: '',
			validUntilMonth: '',
			validUntilDate: '',
		});
		toggleAuthState();
	};
	const state = {
		isAuthenticated,
		userData,
		fillUserData,
		logUserOut,
		toggleAuthState,
		isLoading,
		toggleIsLoading,
	}

	return (
		<AuthContext.Provider value={state}>
			{children}
		</AuthContext.Provider>
	)
}
 
export default AuthContextProvider;
