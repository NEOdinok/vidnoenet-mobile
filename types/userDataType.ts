type userDataType = {
	balance: string;
	accountNumber: string;
	tariffName: string;
	validUntilMonth: string;
	validUntilDate: string;
}

type LoginUserType = (login: string, password: string) => LoginReturnType;

type LoginReturnType = Promise<userDataType|undefined>;

export {
	type userDataType,
	type LoginUserType,
	type LoginReturnType,
}