import type {
	ChatMessage,
	ChatProfile,
	Conversation,
	PresenceUser,
} from "@/features/chat/types/chat.types";

export const ONLINE_USERS: PresenceUser[] = [
	{ id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?u=1" },
	{ id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?u=2" },
	{ id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?u=3" },
	{ id: 4, name: "Diana", avatar: "https://i.pravatar.cc/150?u=4" },
	{ id: 5, name: "Eve", avatar: "https://i.pravatar.cc/150?u=5" },
	{ id: 6, name: "Frank", avatar: "https://i.pravatar.cc/150?u=6" },
];

export const CONVERSATIONS: Conversation[] = [
	{
		id: 1,
		name: "Team Alpha",
		lastMessage: "Let's meet at 3 PM.",
		time: "10:30 AM",
		unread: 2,
		avatar: "https://i.pravatar.cc/150?u=10",
	},
	{
		id: 2,
		name: "Bob",
		lastMessage: "Got the files, thanks!",
		time: "Yesterday",
		unread: 0,
		avatar: "https://i.pravatar.cc/150?u=2",
	},
	{
		id: 3,
		name: "Design Sync",
		lastMessage: "The new logo looks great.",
		time: "Yesterday",
		unread: 0,
		avatar: "https://i.pravatar.cc/150?u=11",
	},
	{
		id: 4,
		name: "Alice",
		lastMessage: "Are we still on for lunch?",
		time: "Tuesday",
		unread: 0,
		avatar: "https://i.pravatar.cc/150?u=1",
	},
	{
		id: 5,
		name: "Marketing",
		lastMessage: "Campaign goes live tomorrow.",
		time: "Monday",
		unread: 5,
		avatar: "https://i.pravatar.cc/150?u=12",
	},
];

export const INITIAL_MESSAGES: ChatMessage[] = [
	{
		id: 1,
		sender: "Alice",
		text: "Hi everyone! How is the project going?",
		timestamp: "10:00 AM",
		isMe: false,
	},
	{
		id: 2,
		sender: "Bob",
		text: "Going well. Just finished the frontend.",
		timestamp: "10:05 AM",
		isMe: false,
	},
	{
		id: 3,
		sender: "Me",
		text: "Awesome! I will start on the backend today.",
		timestamp: "10:10 AM",
		isMe: true,
	},
	{
		id: 4,
		sender: "Alice",
		text: "Great. Let's sync up tomorrow.",
		timestamp: "10:15 AM",
		isMe: false,
	},
];

export const DEFAULT_PROFILE: ChatProfile = {
	name: "Alex Editor",
	avatar: "https://i.pravatar.cc/150?u=99",
	status: "Working on the autumn issue",
	password: "password123",
};
