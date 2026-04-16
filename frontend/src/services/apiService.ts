import axios, {
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	isAxiosError,
} from "axios";
import {
	clearAuthSession,
	readAuthSession,
} from "@/features/auth/lib/authStorage";
import { env } from "@/shared/config/env";

type ApiErrorPayload = {
	error?: string;
	message?: string;
};

export type ApiRequestConfig = AxiosRequestConfig & {
	requiresAuth?: boolean;
};

export class ApiService {
	private readonly client = axios.create({
		baseURL: env.apiBaseUrl,
		headers: {
			"Content-Type": "application/json",
		},
	});

	constructor() {
		this.client.interceptors.request.use((request) =>
			this.attachAuthorizationHeader(request),
		);
		this.client.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error) => Promise.reject(this.toApiError(error)),
		);
	}

	private attachAuthorizationHeader(
		request: InternalAxiosRequestConfig & { requiresAuth?: boolean },
	) {
		const requiresAuth = request.requiresAuth ?? true;
		if (!requiresAuth) {
			return request;
		}

		const accessToken = readAuthSession()?.accessToken;
		if (!accessToken) {
			return request;
		}

		if ("set" in request.headers && typeof request.headers.set === "function") {
			request.headers.set("Authorization", `Bearer ${accessToken}`);
		} else {
			request.headers.Authorization = `Bearer ${accessToken}`;
		}

		return request;
	}

	private toApiError(error: unknown): Error {
		if (!isAxiosError<ApiErrorPayload>(error)) {
			return new Error("Unexpected API error");
		}

		const requestConfig = error.config as ApiRequestConfig | undefined;
		const requiresAuth = requestConfig?.requiresAuth ?? true;

		if (requiresAuth && error.response?.status === 401) {
			clearAuthSession();
		}

		const payload = error.response?.data;
		const message = payload?.error ?? payload?.message ?? error.message;

		return new Error(message || "Request failed");
	}

	async request<T>(config: ApiRequestConfig): Promise<T> {
		const response = await this.client.request<T>(config);
		return response.data;
	}
}

export const apiService = new ApiService();
