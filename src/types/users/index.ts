export type User = {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	created_at: string;
};

export type AuthUser = Pick<User, "id" | "username" | "email">;

export type UserRegister = Pick<User, "username" | "email"> & {
	password: string;
};

export type UserLogin = {
	identifier: string;
	password: string;
};

export type RegisterUserResult =
	| {
			error: string;
			status: number;
	  }
	| {
			user: AuthUser;
	  };

export type LoginUserResult =
	| {
			error: string;
			status: number;
	  }
	| {
			user: AuthUser;
			accessToken: string;
			refreshToken: string;
	  };
