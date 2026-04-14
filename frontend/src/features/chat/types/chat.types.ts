export type PresenceUser = {
	id: number;
	name: string;
	avatar: string;
};

export type Conversation = {
	id: number;
	name: string;
	lastMessage: string;
	time: string;
	unread: number;
	avatar: string;
};

export type ChatMessage = {
	id: number;
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
