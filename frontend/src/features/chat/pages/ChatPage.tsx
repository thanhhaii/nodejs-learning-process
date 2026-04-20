import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DEFAULT_PROFILE, ONLINE_USERS } from "@/features/chat/data/mockChatData";
import { getChatHistories } from "@/features/chat/api/getListMessage";
import { getChatMessages } from "@/features/chat/api/getChatMessages";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import type {
	ApiChatMessage,
	ChatMessage,
	ChatHistorySummary,
	ChatProfile,
	Conversation,
} from "@/features/chat/types/chat.types";

function buildAvatarUrl(userId: string) {
	return `https://i.pravatar.cc/150?u=${userId}`;
}

function formatConversationTime(value: string | null) {
	if (!value) {
		return "No messages yet";
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		month: "short",
		day: "numeric",
	}).format(date);
}

function mapHistoryToConversation(history: ChatHistorySummary): Conversation {
	return {
		id: history.conversationId,
		otherUserId: history.otherUserId,
		name: history.otherUsername,
		lastMessage: history.lastMessage ?? "No messages yet",
		time: formatConversationTime(history.lastMessageAt),
		unread: 0,
		avatar: buildAvatarUrl(history.otherUserId),
	};
}

function mapApiMessageToChatMessage(
	apiMsg: ApiChatMessage,
	currentUserId: string,
): ChatMessage {
	const date = new Date(apiMsg.createdAt);
	const timestamp = Number.isNaN(date.getTime())
		? ""
		: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

	return {
		id: apiMsg.id,
		sender: apiMsg.senderId,
		text: apiMsg.content,
		timestamp,
		isMe: apiMsg.senderId === currentUserId,
	};
}

export function ChatPage() {
	const { logout, session } = useAuth();
	const sessionUser = session?.user;

	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [conversationsError, setConversationsError] = useState<string | null>(null);
	const [isLoadingConversations, setIsLoadingConversations] = useState(true);

	const [activeConversation, setActiveConversation] =
		useState<Conversation | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoadingMessages, setIsLoadingMessages] = useState(false);
	const [messagesError, setMessagesError] = useState<string | null>(null);

	const [draftMessage, setDraftMessage] = useState("");
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [profile, setProfile] = useState<ChatProfile>(() => ({
		...DEFAULT_PROFILE,
		name: sessionUser?.username ?? DEFAULT_PROFILE.name,
	}));
	const [editUser, setEditUser] = useState<ChatProfile>(() => ({
		...DEFAULT_PROFILE,
		name: sessionUser?.username ?? DEFAULT_PROFILE.name,
	}));

	// Load conversations on mount
	useEffect(() => {
		if (!sessionUser) {
			setConversations([]);
			setConversationsError(null);
			setIsLoadingConversations(false);
			return;
		}

		let isMounted = true;

		const loadChatHistories = async () => {
			try {
				setIsLoadingConversations(true);
				setConversationsError(null);

				const response = await getChatHistories();
				if (!isMounted) return;

				setConversations(response.data.map(mapHistoryToConversation));
			} catch (error) {
				if (!isMounted) return;

				setConversations([]);
				setConversationsError(
					error instanceof Error
						? error.message
						: "Unable to load chat histories.",
				);
			} finally {
				if (isMounted) {
					setIsLoadingConversations(false);
				}
			}
		};

		void loadChatHistories();

		return () => {
			isMounted = false;
		};
	}, [sessionUser]);

	// Load messages when active conversation changes
	useEffect(() => {
		if (!sessionUser || !activeConversation) {
			setMessages([]);
			setMessagesError(null);
			return;
		}

		let isMounted = true;

		const loadMessages = async () => {
			try {
				setIsLoadingMessages(true);
				setMessagesError(null);

				const response = await getChatMessages(
					activeConversation.otherUserId,
				);
				if (!isMounted) return;

				setMessages(
					response.data.map((m) =>
						mapApiMessageToChatMessage(m, String(sessionUser.id)),
					),
				);
			} catch (error) {
				if (!isMounted) return;

				setMessages([]);
				setMessagesError(
					error instanceof Error
						? error.message
						: "Unable to load messages.",
				);
			} finally {
				if (isMounted) {
					setIsLoadingMessages(false);
				}
			}
		};

		void loadMessages();

		return () => {
			isMounted = false;
		};
	}, [sessionUser, activeConversation]);

	if (!sessionUser) {
		return null;
	}

	const currentUser: ChatProfile = {
		...profile,
		name: profile.name || sessionUser.username,
	};

	const handleSelectConversation = (conversation: Conversation) => {
		if (activeConversation?.id === conversation.id) return;
		setActiveConversation(conversation);
		setDraftMessage("");
	};

	const handleOpenSettings = () => {
		setEditUser(currentUser);
		setIsSettingsOpen(true);
	};

	const handleSaveSettings = () => {
		setProfile(editUser);
		setIsSettingsOpen(false);
	};

	const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextMessage = draftMessage.trim();
		if (!nextMessage) return;

		const newMessage: ChatMessage = {
			id: `local-${Date.now()}`,
			sender: String(sessionUser.id),
			text: nextMessage,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			isMe: true,
		};

		setMessages((currentMessages) => [...currentMessages, newMessage]);
		setDraftMessage("");
	};

	return (
		<ChatLayout
			activeConversationId={activeConversation?.id ?? null}
			conversations={conversations}
			conversationsError={conversationsError}
			conversationsLoading={isLoadingConversations}
			currentUser={currentUser}
			draftMessage={draftMessage}
			editUser={editUser}
			isSettingsOpen={isSettingsOpen}
			messages={messages}
			messagesError={messagesError}
			messagesLoading={isLoadingMessages}
			onCloseSettings={() => setIsSettingsOpen(false)}
			onDraftMessageChange={setDraftMessage}
			onLogout={logout}
			onOpenSettings={handleOpenSettings}
			onSaveSettings={handleSaveSettings}
			onSearchChange={() => {}}
			onSelectConversation={handleSelectConversation}
			onSendMessage={handleSendMessage}
			onUpdateDraftUser={setEditUser}
			onlineUsers={ONLINE_USERS}
		/>
	);
}
