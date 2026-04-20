import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { MessageComposer } from "@/features/chat/components/MessageComposer";
import { MessageList } from "@/features/chat/components/MessageList";
import type {
	ChatMessage,
	Conversation,
} from "@/features/chat/types/chat.types";

type ChatPanelProps = {
	conversation: Conversation | null;
	draftMessage: string;
	messages: ChatMessage[];
	messagesError?: string | null;
	messagesLoading?: boolean;
	onDraftMessageChange: (value: string) => void;
	onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function ChatPanel({
	conversation,
	draftMessage,
	messages,
	messagesError,
	messagesLoading,
	onDraftMessageChange,
	onSendMessage,
}: ChatPanelProps) {
	const showEmpty = !conversation;
	const isActive = !!conversation;

	return (
		<section className="relative flex flex-1 flex-col overflow-hidden bg-white">
			<ChatHeader conversation={conversation} />

			{showEmpty ? (
				<div className="flex flex-1 items-center justify-center text-[13px] text-muted select-none">
					Select a conversation to start chatting
				</div>
			) : messagesLoading ? (
				<div className="flex flex-1 items-center justify-center text-[13px] text-muted select-none">
					Loading messages…
				</div>
			) : messagesError ? (
				<div className="flex flex-1 items-center justify-center text-[13px] text-muted select-none">
					{messagesError}
				</div>
			) : (
				<MessageList messages={messages} />
			)}

			{isActive ? (
				<MessageComposer
					draftMessage={draftMessage}
					onDraftMessageChange={onDraftMessageChange}
					onSendMessage={onSendMessage}
				/>
			) : null}

			<div className="pointer-events-none absolute right-[-20px] bottom-[-20px] z-0 text-[120px] font-black tracking-tighter opacity-[0.03]">
				CHAT
			</div>
		</section>
	);
}
