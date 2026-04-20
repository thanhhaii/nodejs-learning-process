import { ChatPanel } from "@/features/chat/components/ChatPanel";
import { SettingsDialog } from "@/features/chat/components/SettingsDialog";
import { Sidebar } from "@/features/chat/components/Sidebar";
import type {
	ChatMessage,
	ChatProfile,
	Conversation,
	PresenceUser,
} from "@/features/chat/types/chat.types";

type ChatLayoutProps = {
	activeConversationId: string | null;
	conversations: Conversation[];
	conversationsError?: string | null;
	conversationsLoading?: boolean;
	currentUser: ChatProfile;
	draftMessage: string;
	editUser: ChatProfile;
	isSettingsOpen: boolean;
	messages: ChatMessage[];
	messagesError?: string | null;
	messagesLoading?: boolean;
	onCloseSettings: () => void;
	onDraftMessageChange: (value: string) => void;
	onLogout: () => void;
	onOpenSettings: () => void;
	onSaveSettings: () => void;
	onSearchChange: (value: string) => void;
	onSelectConversation: (conversation: Conversation) => void;
	onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
	onUpdateDraftUser: (draft: ChatProfile) => void;
	onlineUsers: PresenceUser[];
};

export function ChatLayout({
	activeConversationId,
	conversations,
	conversationsError,
	conversationsLoading,
	currentUser,
	draftMessage,
	editUser,
	isSettingsOpen,
	messages,
	messagesError,
	messagesLoading,
	onCloseSettings,
	onDraftMessageChange,
	onLogout,
	onOpenSettings,
	onSaveSettings,
	onSearchChange,
	onSelectConversation,
	onSendMessage,
	onUpdateDraftUser,
	onlineUsers,
}: ChatLayoutProps) {
	const activeConversation =
		conversations.find((c) => c.id === activeConversationId) ?? null;

	return (
		<div className="min-h-screen bg-page px-4 py-4 text-black sm:px-6 sm:py-6 lg:px-8">
			{isSettingsOpen ? (
				<SettingsDialog
					draftUser={editUser}
					onCancel={onCloseSettings}
					onChange={onUpdateDraftUser}
					onSave={onSaveSettings}
				/>
			) : null}

			<div className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-[1280px] flex-col overflow-hidden border border-black/5 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] lg:min-h-[680px] lg:flex-row">
				<Sidebar
					activeConversationId={activeConversationId}
					conversations={conversations}
					currentUser={currentUser}
					errorMessage={conversationsError}
					isLoading={conversationsLoading}
					onLogout={onLogout}
					onOpenSettings={onOpenSettings}
					onSearchChange={onSearchChange}
					onSelectConversation={onSelectConversation}
					onlineUsers={onlineUsers}
				/>
				<ChatPanel
					conversation={activeConversation}
					draftMessage={draftMessage}
					messages={messages}
					messagesError={messagesError}
					messagesLoading={messagesLoading}
					onDraftMessageChange={onDraftMessageChange}
					onSendMessage={onSendMessage}
				/>
			</div>
		</div>
	);
}
