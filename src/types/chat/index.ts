export type ChatMessage = {
	id: string;
	senderId: number;
	receiverId: number;
	content: string;
	createdAt: Date;
};

// service -> repository
export type CreateMessageInput = {
	senderId: number;
	receiverId: number;
	content: string;
};

// return to client
export type ChatHistoryItem = ChatMessage;

export type SocketAuthUser = {
	userId: number;
	email: string;
};

// Client -> Server
export interface SendMessageEvent {
	receiverId: number;
	content: string;
}

// Server -> Sender (ack)
export type MessageSentEvent = {
	messageId: string;
	receiverId: number;
	content: string;
	createdAt: string;
};

// Server -> Receiver
export interface MessageReceivedEvent {
	messageId: string;
	senderId: number;
	content: string;
	createdAt: string;
}

// Server -> Client (lỗi)
export type SocketErrorEvent = {
	message: string;
};
