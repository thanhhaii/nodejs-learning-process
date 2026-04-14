import { LogOut, Settings } from "lucide-react";
import type { ChatProfile } from "@/features/chat/types/chat.types";

type CurrentUserCardProps = {
	currentUser: ChatProfile;
	onLogout: () => void;
	onOpenSettings: () => void;
};

export function CurrentUserCard({
	currentUser,
	onLogout,
	onOpenSettings,
}: CurrentUserCardProps) {
	return (
		<div className="mt-auto flex items-center justify-between border-t border-border-light bg-white p-6">
			<div className="flex items-center gap-3 overflow-hidden">
				<div className="relative shrink-0">
					<img
						alt={currentUser.name}
						className="h-10 w-10 rounded-full border-2 border-black object-cover grayscale"
						src={currentUser.avatar}
					/>
					<span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent" />
				</div>
				<div className="min-w-0">
					<div className="truncate text-[14px] font-bold">
						{currentUser.name}
					</div>
					<div className="truncate text-[10px] text-muted">
						{currentUser.status}
					</div>
				</div>
			</div>

			<div className="ml-2 flex shrink-0 items-center gap-3">
				<button
					className="text-muted transition-colors hover:text-black"
					onClick={onOpenSettings}
					type="button"
				>
					<Settings size={18} strokeWidth={2} />
				</button>
				<button
					className="text-muted transition-colors hover:text-black"
					onClick={onLogout}
					type="button"
				>
					<LogOut size={18} strokeWidth={2} />
				</button>
			</div>
		</div>
	);
}
