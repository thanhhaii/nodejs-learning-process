import type {
    LoginRequest,
    LoginResponse,
} from "@/features/auth/types/auth.types";
import { apiService } from "@/services/apiService";

export async function loginRequest(
    payload: LoginRequest,
): Promise<LoginResponse> {
    return apiService.request<LoginResponse>({
        url: "/login",
        method: "POST",
        data: payload,
        requiresAuth: false,
    });
}
