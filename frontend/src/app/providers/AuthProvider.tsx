import {
	type PropsWithChildren,
	startTransition,
	useEffect,
	useMemo,
	useState,
} from "react";
import { loginRequest } from "@/features/auth/api/loginRequest";
import { AuthContext } from "@/features/auth/context/authContext";
import {
	clearAuthSession,
	readAuthSession,
	writeAuthSession,
} from "@/features/auth/lib/authStorage";
import type {
	AuthContextValue,
	AuthSession,
	LoginRequest,
} from "@/features/auth/types/auth.types";

export function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const storedSession = readAuthSession();
		startTransition(() => {
			setSession(storedSession);
			setIsReady(true);
		});
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			isReady,
			session,
			async login(payload: LoginRequest) {
				const nextSession = await loginRequest(payload);
				writeAuthSession(nextSession);
				startTransition(() => {
					setSession(nextSession);
				});
				return nextSession;
			},
			logout() {
				clearAuthSession();
				startTransition(() => {
					setSession(null);
				});
			},
		}),
		[isReady, session],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
