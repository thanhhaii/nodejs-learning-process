import { Search } from "lucide-react";
import { ConversationList } from "@/features/chat/components/ConversationList";
import { CurrentUserCard } from "@/features/chat/components/CurrentUserCard";
import { OnlineUserStrip } from "@/features/chat/components/OnlineUserStrip";
import type {
	ChatProfile,
	Conversation,
	PresenceUser,
} from "@/features/chat/types/chat.types";

type SidebarProps = {
	conversations: Conversation[];
	currentUser: ChatProfile;
	onLogout: () => void;
	onOpenSettings: () => void;
	onSearchChange: (value: string) => void;
	onlineUsers: PresenceUser[];
};

export function Sidebar({
	conversations,
	currentUser,
	onLogout,
	onOpenSettings,
	onSearchChange,
	onlineUsers,
}: SidebarProps) {
	return (
		<aside className="flex w-full shrink-0 flex-col border-b border-border-light bg-sidebar lg:w-[320px] lg:border-b-0 lg:border-r">
			<div className="border-b border-border-light p-6">
				<span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
					Online now
				</span>
				<OnlineUserStrip users={onlineUsers} />
			</div>

			<div className="p-6 pb-0">
				<label className="relative block">
					<Search
						className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
						size={16}
					/>
					<input
						className="w-full border border-border-light bg-white py-3 pr-4 pl-10 text-[14px] outline-none"
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder="Search messages..."
						type="text"
					/>
				</label>
			</div>

			<ConversationList conversations={conversations} />

			<CurrentUserCard
				currentUser={currentUser}
				onLogout={onLogout}
				onOpenSettings={onOpenSettings}
			/>
		</aside>
	);
}
