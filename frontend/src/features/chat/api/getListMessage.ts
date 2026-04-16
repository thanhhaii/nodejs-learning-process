import { apiService } from "@/services/apiService";

export async function getListMessage() {
    return apiService.request({
        url: "/",
        method: "GET",
        requiresAuth: true,
    });
}
