import type {
	ApiErrorResponse,
	LoginRequest,
	LoginResponse,
} from "@/features/auth/types/auth.types";
import { env } from "@/shared/config/env";

export async function loginRequest(
	payload: LoginRequest,
): Promise<LoginResponse> {
	const response = await fetch(`${env.apiBaseUrl}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data = (await response.json()) as LoginResponse | ApiErrorResponse;

	if (!response.ok) {
		throw new Error("error" in data ? data.error : "Login failed");
	}

	return data as LoginResponse;
}
