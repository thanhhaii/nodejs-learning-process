import type { Conversation } from "@/features/chat/types/chat.types";

type ConversationListProps = {
	activeConversationId?: string | null;
	conversations: Conversation[];
	errorMessage?: string | null;
	isLoading?: boolean;
	onSelectConversation: (conversation: Conversation) => void;
};

export function ConversationList({
	activeConversationId,
	conversations,
	errorMessage,
	isLoading = false,
	onSelectConversation,
}: ConversationListProps) {
	return (
		<div
			className="flex-1 overflow-y-auto p-6"
			style={{ scrollbarWidth: "thin" }}
		>
			<span className="mt-2 mb-3 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
				Past conversations
			</span>

			{isLoading ? (
				<div className="border-b border-border-light py-3 text-[12px] text-muted">
					Loading conversations...
				</div>
			) : null}

			{!isLoading && errorMessage ? (
				<div className="border-b border-border-light py-3 text-[12px] text-muted">
					{errorMessage}
				</div>
			) : null}

			{!isLoading && !errorMessage && conversations.length === 0 ? (
				<div className="border-b border-border-light py-3 text-[12px] text-muted">
					No chat history yet.
				</div>
			) : null}

			{!isLoading && !errorMessage
				? conversations.map((conversation) => {
						const isActive = conversation.id === activeConversationId;
						return (
						<button
								className={`flex w-full cursor-pointer items-center justify-between border-b border-border-light py-3 text-left transition-colors ${
									isActive
										? "bg-black/5"
										: "hover:bg-black/2"
								}`}
								key={conversation.id}
								onClick={() => onSelectConversation(conversation)}
								type="button"
							>
								<div className="flex items-center gap-3">
									<div className="relative">
										<img
											alt={conversation.name}
											className="h-8 w-8 rounded-full object-cover grayscale"
											src={conversation.avatar}
										/>
										{isActive ? (
											<span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-black" />
										) : null}
									</div>
									<div>
										<div
											className={`text-[14px] ${isActive ? "font-bold" : "font-semibold"}`}
										>
											{conversation.name}
										</div>
										<div className="w-32 truncate text-[12px] text-muted">
											{conversation.lastMessage}
										</div>
									</div>
								</div>

								<div className="flex flex-col items-end gap-1">
									<div className="text-[12px] text-muted">
										{conversation.time}
									</div>
									{conversation.unread > 0 ? (
										<div className="flex h-4 w-4 items-center justify-center rounded-full bg-black">
											<span className="text-[9px] font-bold text-white">
												{conversation.unread}
											</span>
										</div>
									) : null}
								</div>
							</button>
						);
					})
				: null}
		</div>
	);
}
