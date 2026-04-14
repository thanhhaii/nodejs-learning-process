import type { Conversation } from "@/features/chat/types/chat.types";

type ConversationListProps = {
	conversations: Conversation[];
};

export function ConversationList({ conversations }: ConversationListProps) {
	return (
		<div
			className="flex-1 overflow-y-auto p-6"
			style={{ scrollbarWidth: "thin" }}
		>
			<span className="mt-2 mb-3 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
				Past conversations
			</span>

			{conversations.map((conversation) => (
				<div
					className="flex cursor-pointer items-center justify-between border-b border-border-light py-3"
					key={conversation.id}
				>
					<div className="flex items-center gap-3">
						<img
							alt={conversation.name}
							className="h-8 w-8 rounded-full object-cover grayscale"
							src={conversation.avatar}
						/>
						<div>
							<div className="text-[14px] font-semibold">
								{conversation.name}
							</div>
							<div className="w-32 truncate text-[12px] text-muted">
								{conversation.lastMessage}
							</div>
						</div>
					</div>

					<div className="flex flex-col items-end gap-1">
						<div className="text-[12px] text-muted">{conversation.time}</div>
						{conversation.unread > 0 ? (
							<div className="flex h-4 w-4 items-center justify-center rounded-full bg-black">
								<span className="text-[9px] font-bold text-white">
									{conversation.unread}
								</span>
							</div>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
}
