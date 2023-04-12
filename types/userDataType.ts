type userDataType = {
	balance: string;
	accountNumber: string;
	tariffName: string;
	validUntilMonth: string;
	validUntilDate: string;
	sessionCookie: string;
}

type asyncStorageDataType = {
	login: string,
	password: string,
	cookie: string,
}

type LoginUserFunctionType = (login: string, password: string) => Promise<userDataType|undefined>;
type StoreDataFunctionType = (value: asyncStorageDataType) => Promise<void>;
type GetDataFunctionType = () => Promise<asyncStorageDataType>;

export {
	type userDataType,
	type LoginUserFunctionType,
	type StoreDataFunctionType,
  type GetDataFunctionType,
}