import { WebSocket } from "ws";
import * as chatRepo from "../repositories/chat.repository.js";
import type {
	ChatHistoryItem,
	ChatHistorySummary,
	CreateMessageInput,
	MessageReceivedEvent,
	MessageSentEvent,
	SendMessageEvent,
	SocketAuthUser,
	SocketErrorEvent,
} from "../types/chat/index.js";

const onlineUsers = new Map<string, WebSocket>();

export function registerSocket(userId: string, socket: WebSocket): void {
	onlineUsers.set(userId, socket);
}

export function removeSocket(userId: string): void {
	onlineUsers.delete(userId);
}

function sendToSocket<T>(socket: WebSocket, event: string, payload: T): void {
	if (socket.readyState === WebSocket.OPEN) {
		socket.send(
			JSON.stringify({
				event,
				payload,
			}),
		);
	}
}

export async function handleSendMessage(
	sender: SocketAuthUser,
	data: SendMessageEvent,
	senderSocket: WebSocket,
): Promise<void> {
	const emitError = (message: string) => {
		const err: SocketErrorEvent = { message };
		sendToSocket(senderSocket, "error", err);
	};

	if (!data.receiverId || typeof data.receiverId !== "string") {
		return emitError("receiverId is required.");
	}

	if (data.receiverId === sender.userId) {
		return emitError("You cannot message yourself.");
	}

	if (!data.content || !data.content.trim()) {
		return emitError("Message content cannot be empty.");
	}

	const exists = await chatRepo.userExists(data.receiverId);
	if (!exists) {
		return emitError("Receiver not found");
	}

	const conversation = await chatRepo.findOrCreateConversation(
		sender.userId,
		data.receiverId,
	);

	const input: CreateMessageInput = {
		conversationId: conversation.id,
		senderId: sender.userId,
		receiverId: data.receiverId,
		content: data.content.trim(),
	};
	const saved = await chatRepo.insertMessage(input);

	await chatRepo.updateConversationLastMessage(
		conversation.id,
		saved.id,
		saved.createdAt,
	);

	const sentEvent: MessageSentEvent = {
		messageId: saved.id,
		conversationId: saved.conversationId,
		receiverId: saved.receiverId,
		content: saved.content,
		createdAt: saved.createdAt.toISOString(),
	};
	sendToSocket(senderSocket, "message_sent", sentEvent);

	const receiverSocket = onlineUsers.get(data.receiverId);
	if (receiverSocket) {
		const receivedEvent: MessageReceivedEvent = {
			messageId: saved.id,
			conversationId: saved.conversationId,
			senderId: saved.senderId,
			content: saved.content,
			createdAt: saved.createdAt.toISOString(),
		};
		sendToSocket(receiverSocket, "message_received", receivedEvent);
	}
}

export async function getChatHistory(
	currentUserId: string,
	otherUserId: string,
): Promise<ChatHistoryItem[]> {
	if (!otherUserId) {
		throw new Error("Invalid userId");
	}

	const exists = await chatRepo.userExists(otherUserId);
	if (!exists) {
		throw new Error("User not found");
	}

	const conversation = await chatRepo.findConversationByUsers(
		currentUserId,
		otherUserId,
	);
	if (!conversation) {
		return [];
	}

	const messages = await chatRepo.getMessagesByConversationId(conversation.id);

	return messages.map((m) => ({
		id: m.id,
		conversationId: m.conversationId,
		senderId: m.senderId,
		receiverId: m.receiverId,
		content: m.content,
		createdAt: m.createdAt,
	}));
}

export async function getChatHistories(
	currentUserId: string,
): Promise<ChatHistorySummary[]> {
	return chatRepo.getUserHistories(currentUserId);
}
