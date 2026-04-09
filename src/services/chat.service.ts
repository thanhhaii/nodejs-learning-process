import { WebSocket } from "ws";
import * as chatRepo from "../repositories/chat.repository.js";
import type {
	ChatHistoryItem,
	CreateMessageInput,
	MessageReceivedEvent,
	MessageSentEvent,
	SendMessageEvent,
	SocketAuthUser,
	SocketErrorEvent,
} from "../types/chat/index.js";

const onlineUsers = new Map<number, WebSocket>();

export function registerSocket(userId: number, socket: WebSocket): void {
	onlineUsers.set(userId, socket);
}

export function removeSocket(userId: number): void {
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

	if (!data.receiverId || typeof data.receiverId !== "number") {
		return emitError("receiverId is required.");
	}

	console.log({
		data,
		sender,
	});
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

	const input: CreateMessageInput = {
		senderId: sender.userId,
		receiverId: data.receiverId,
		content: data.content.trim(),
	};
	const saved = await chatRepo.insertMessage(input);

	const sentEvent: MessageSentEvent = {
		messageId: saved.id,
		receiverId: saved.receiverId,
		content: saved.content,
		createdAt: saved.createdAt.toISOString(),
	};
	sendToSocket(senderSocket, "message_sent", sentEvent);
	const receiverSocket = onlineUsers.get(data.receiverId);
	if (receiverSocket) {
		const receivedEvent: MessageReceivedEvent = {
			messageId: saved.id,
			senderId: saved.senderId,
			content: saved.content,
			createdAt: saved.createdAt.toISOString(),
		};
		sendToSocket(receiverSocket, "message_received", receivedEvent);
	}
}

export async function getChatHistory(
	currentUserId: string,
	otherUserId: number,
): Promise<ChatHistoryItem[]> {
	if (!otherUserId || typeof otherUserId !== "string") {
		throw new Error("Invalid userId");
	}

	const exists = await chatRepo.userExists(otherUserId);
	if (!exists) {
		throw new Error("User not found");
	}

	const messages = await chatRepo.getMessagesBetweenUsers(
		currentUserId,
		otherUserId,
	);

	return messages.map((m) => ({
		id: m.id,
		senderId: m.senderId,
		receiverId: m.receiverId,
		content: m.content,
		createdAt: m.createdAt,
	}));
}
