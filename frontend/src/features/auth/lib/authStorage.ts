import type { AuthSession } from "@/features/auth/types/auth.types";

const AUTH_STORAGE_KEY = "chat-app.auth";

export function readAuthSession(): AuthSession | null {
	const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
	if (!rawSession) {
		return null;
	}

	try {
		return JSON.parse(rawSession) as AuthSession;
	} catch {
		window.localStorage.removeItem(AUTH_STORAGE_KEY);
		return null;
	}
}

export function writeAuthSession(session: AuthSession) {
	window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
	window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
