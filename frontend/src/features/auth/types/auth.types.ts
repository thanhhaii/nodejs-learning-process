export type AuthUser = {
	id: number;
	username: string;
	email: string;
};

export type LoginRequest = {
	identifier: string;
	password: string;
};

export type LoginResponse = {
	user: AuthUser;
	accessToken: string;
	refreshToken: string;
};

export type AuthSession = LoginResponse;

export type ApiErrorResponse = {
	error: string;
};

export type AuthContextValue = {
	isReady: boolean;
	session: AuthSession | null;
	login: (payload: LoginRequest) => Promise<AuthSession>;
	logout: () => void;
};
