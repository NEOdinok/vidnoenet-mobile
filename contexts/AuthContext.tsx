import { ReactNode, createContext, useState } from "react"

export const AuthContext = createContext({
	isAuthenticated: false,
	userData: {
		balance: '',
		account: '',
		tariffName: '',
		paidUntil: '',
		htmlString: '',
	},
	parseHtml: (val: string) => {},
});

interface AuthContextProps {
	children: ReactNode,
}

interface AuthContextState {
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [userData, setUserData] = useState({
		balance: '',
		account: '',
		tariffName: '',
		paidUntil: '',
		htmlString: '',
	})

	const parseHtml = (htmlString: string) => {
		//parse htmlString
		//find everything we need
		//update userDAta via setUserData with new data
	}

	const state = {
		isAuthenticated: false,
		userData: userData,
		parseHtml,
	}

	return (
		<AuthContext.Provider value={state}>
			{children}
		</AuthContext.Provider>
	)
}
 
export default AuthContextProvider;
