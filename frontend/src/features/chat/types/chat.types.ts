export type PresenceUser = {
	id: number | string;
	name: string;
	avatar: string;
};

export type Conversation = {
	id: string;
	otherUserId: string;
	name: string;
	lastMessage: string;
	time: string;
	unread: number;
	avatar: string;
};

export type ChatMessage = {
	id: string;
	sender: string;
	text: string;
	timestamp: string;
	isMe: boolean;
};

export type ChatProfile = {
	name: string;
	avatar: string;
	status: string;
	password: string;
};

export type ChatHistorySummary = {
	conversationId: string;
	otherUserId: string;
	otherUsername: string;
	lastMessage: string | null;
	lastMessageAt: string | null;
};

export type ChatHistoryResponse = {
	data: ChatHistorySummary[];
};

export type ApiChatMessage = {
	id: string;
	conversationId: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
};

export type ChatMessagesResponse = {
	data: ApiChatMessage[];
};
