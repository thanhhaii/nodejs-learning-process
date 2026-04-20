import { apiService } from "@/services/apiService";
import type { ChatHistoryResponse } from "@/features/chat/types/chat.types";

export async function getChatHistories() {
	return apiService.request<ChatHistoryResponse>({
		url: "/chat/histories",
		method: "GET",
		requiresAuth: true,
	});
}
