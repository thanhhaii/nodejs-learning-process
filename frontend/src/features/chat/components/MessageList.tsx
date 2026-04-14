import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/features/chat/types/chat.types";

type MessageListProps = {
	messages: ChatMessage[];
};

export function MessageList({ messages }: MessageListProps) {
	const endRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div
			className="relative z-10 flex flex-1 flex-col gap-6 overflow-y-auto p-6 sm:p-8"
			style={{ scrollbarWidth: "thin" }}
		>
			{messages.map((message, index) => {
				const previousMessage = messages[index - 1];
				const showAvatar =
					!message.isMe && previousMessage?.sender !== message.sender;

				return (
					<div
						className={`flex max-w-[85%] flex-col ${
							message.isMe ? "self-end items-end" : "self-start items-start"
						}`}
						key={message.id}
					>
						{showAvatar ? (
							<span className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
								{message.sender}
							</span>
						) : null}

						<div
							className={`rounded-sm p-4 text-[14px] leading-relaxed ${
								message.isMe ? "bg-black text-white" : "bg-[#f0f0f0] text-black"
							}`}
						>
							{message.text}
						</div>

						<span className="mt-1 text-[10px] text-muted">
							{message.timestamp}
						</span>
					</div>
				);
			})}
			<div ref={endRef} />
		</div>
	);
}
