import { MoreVertical, Phone, Video } from "lucide-react";
import type { Conversation } from "@/features/chat/types/chat.types";

type ChatHeaderProps = {
	conversation: Conversation;
};

export function ChatHeader({ conversation }: ChatHeaderProps) {
	return (
		<div className="z-10 flex items-center justify-between border-b border-border-light bg-white p-6">
			<div className="flex items-center space-x-4">
				<div>
					<h1 className="text-[18px] font-extrabold uppercase">
						{conversation.name}
					</h1>
					<span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
						Direct message
					</span>
				</div>
			</div>

			<div className="flex items-center space-x-4 text-black">
				<button className="transition-colors hover:text-muted" type="button">
					<Phone size={20} strokeWidth={2} />
				</button>
				<button className="transition-colors hover:text-muted" type="button">
					<Video size={20} strokeWidth={2} />
				</button>
				<button className="transition-colors hover:text-muted" type="button">
					<MoreVertical size={20} strokeWidth={2} />
				</button>
			</div>
		</div>
	);
}
