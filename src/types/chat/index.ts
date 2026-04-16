export type Conversation = {
	id: string;
	userOneId: string;
	userTwoId: string;
	lastMessageId: string | null;
	lastMessageAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export type ChatMessage = {
	id: string;
	conversationId: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: Date;
};

export type CreateMessageInput = {
	conversationId: string;
	senderId: string;
	receiverId: string;
	content: string;
};

export type ChatHistoryItem = ChatMessage;

export type ChatHistorySummary = {
	conversationId: string;
	otherUserId: string;
	lastMessage: string | null;
	lastMessageAt: Date | null;
};

export type SocketAuthUser = {
	userId: string;
	email: string;
};

export interface SendMessageEvent {
	receiverId: string;
	content: string;
}

export type MessageSentEvent = {
	messageId: string;
	conversationId: string;
	receiverId: string;
	content: string;
	createdAt: string;
};

export interface MessageReceivedEvent {
	messageId: string;
	conversationId: string;
	senderId: string;
	content: string;
	createdAt: string;
}

export type SocketErrorEvent = {
	message: string;
};
