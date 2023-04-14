import { makeAutoObservable } from 'mobx'
import { userDataType } from '../types/userDataType';
import { clearData } from "../utils/asyncStorage";

class Store {
	isAuthenticated: boolean = false;
	isLoading: boolean = false;
	userData: userDataType = {
		balance: '',
		accountNumber: '',
		tariffName: '',
		validUntilMonth: '',
		validUntilDate: '',
		sessionCookie: '',
	};
	changeIsAuth(value: boolean) {
		this.isAuthenticated = value;
		console.log('[store] isAuthenticated:', this.isAuthenticated);
	};
	changeIsLoading(value: boolean) {
		this.isLoading = value;
		console.log('[store] isLoading:', this.isLoading);
	};
	fillUserData(data: userDataType) {
		// this.userData = data;
		// this.userData.balance = data.balance;
		// this.userData.accountNumber= data.accountNumber;
		// this.userData.tariffName = data.tariffName;
		// this.userData.validUntilMonth = data.validUntilMonth;
		// this.userData.validUntilDate = data.validUntilDate;
		// this.userData.sessionCookie= data.sessionCookie;
		this.userData = {
			balance: data.balance,
			accountNumber: data.accountNumber,
			tariffName: data.tariffName,
			validUntilMonth: data.validUntilMonth,
			validUntilDate: data.validUntilDate,
			sessionCookie: data.sessionCookie,
		};
	};
	logUserOut() {
		this.userData = {
			balance: '',
			accountNumber: '',
			tariffName: '',
			validUntilMonth: '',
			validUntilDate: '',
			sessionCookie: '',
		};
		clearData();
		this.isLoading = false;
		this.isAuthenticated = false;
	};
	constructor() {
    makeAutoObservable(this);
  };
}

export default new Store();