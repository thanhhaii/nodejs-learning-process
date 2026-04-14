import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	CONVERSATIONS,
	DEFAULT_PROFILE,
	INITIAL_MESSAGES,
	ONLINE_USERS,
} from "@/features/chat/data/mockChatData";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import type {
	ChatMessage,
	ChatProfile,
} from "@/features/chat/types/chat.types";

export function ChatPage() {
	const { logout, session } = useAuth();
	const sessionUser = session?.user;

	const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
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

	if (!sessionUser) {
		return null;
	}

	const currentUser: ChatProfile = {
		...profile,
		name: profile.name || sessionUser.username,
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
		if (!nextMessage) {
			return;
		}

		const newMessage: ChatMessage = {
			id: Date.now(),
			sender: currentUser.name,
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
			conversations={CONVERSATIONS}
			currentUser={currentUser}
			draftMessage={draftMessage}
			editUser={editUser}
			isSettingsOpen={isSettingsOpen}
			messages={messages}
			onCloseSettings={() => setIsSettingsOpen(false)}
			onDraftMessageChange={setDraftMessage}
			onLogout={logout}
			onOpenSettings={handleOpenSettings}
			onSaveSettings={handleSaveSettings}
			onSearchChange={() => {}}
			onSendMessage={handleSendMessage}
			onUpdateDraftUser={setEditUser}
			onlineUsers={ONLINE_USERS}
		/>
	);
}
