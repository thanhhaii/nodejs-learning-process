import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { MessageComposer } from "@/features/chat/components/MessageComposer";
import { MessageList } from "@/features/chat/components/MessageList";
import type {
	ChatMessage,
	Conversation,
} from "@/features/chat/types/chat.types";

type ChatPanelProps = {
	conversation: Conversation;
	draftMessage: string;
	messages: ChatMessage[];
	onDraftMessageChange: (value: string) => void;
	onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function ChatPanel({
	conversation,
	draftMessage,
	messages,
	onDraftMessageChange,
	onSendMessage,
}: ChatPanelProps) {
	return (
		<section className="relative flex flex-1 flex-col overflow-hidden bg-white">
			<ChatHeader conversation={conversation} />
			<MessageList messages={messages} />
			<MessageComposer
				draftMessage={draftMessage}
				onDraftMessageChange={onDraftMessageChange}
				onSendMessage={onSendMessage}
			/>
			<div className="pointer-events-none absolute right-[-20px] bottom-[-20px] z-0 text-[120px] font-black tracking-tighter opacity-[0.03]">
				CHAT
			</div>
		</section>
	);
}
