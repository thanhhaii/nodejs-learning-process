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
	conversations: Conversation[];
	currentUser: ChatProfile;
	draftMessage: string;
	editUser: ChatProfile;
	isSettingsOpen: boolean;
	messages: ChatMessage[];
	onCloseSettings: () => void;
	onDraftMessageChange: (value: string) => void;
	onLogout: () => void;
	onOpenSettings: () => void;
	onSaveSettings: () => void;
	onSearchChange: (value: string) => void;
	onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
	onUpdateDraftUser: (draft: ChatProfile) => void;
	onlineUsers: PresenceUser[];
};

export function ChatLayout({
	conversations,
	currentUser,
	draftMessage,
	editUser,
	isSettingsOpen,
	messages,
	onCloseSettings,
	onDraftMessageChange,
	onLogout,
	onOpenSettings,
	onSaveSettings,
	onSearchChange,
	onSendMessage,
	onUpdateDraftUser,
	onlineUsers,
}: ChatLayoutProps) {
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
					conversations={conversations}
					currentUser={currentUser}
					onLogout={onLogout}
					onOpenSettings={onOpenSettings}
					onSearchChange={onSearchChange}
					onlineUsers={onlineUsers}
				/>
				<ChatPanel
					conversation={conversations[0]}
					draftMessage={draftMessage}
					messages={messages}
					onDraftMessageChange={onDraftMessageChange}
					onSendMessage={onSendMessage}
				/>
			</div>
		</div>
	);
}
