import { apiService } from "@/services/apiService";
import type { ChatMessagesResponse } from "@/features/chat/types/chat.types";

export async function getChatMessages(
	otherUserId: string,
): Promise<ChatMessagesResponse> {
	return apiService.request<ChatMessagesResponse>({
		url: `/chat/${otherUserId}/messages`,
		method: "GET",
		requiresAuth: true,
	});
}
