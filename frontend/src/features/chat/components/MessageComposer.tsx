import { Paperclip, Smile } from "lucide-react";

type MessageComposerProps = {
	draftMessage: string;
	onDraftMessageChange: (value: string) => void;
	onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function MessageComposer({
	draftMessage,
	onDraftMessageChange,
	onSendMessage,
}: MessageComposerProps) {
	const isDisabled = !draftMessage.trim();

	return (
		<div className="relative z-10 flex items-center gap-4 border-t border-border-light bg-white p-6">
			<button
				className="text-black transition-colors hover:text-muted"
				type="button"
			>
				<Paperclip size={20} strokeWidth={2} />
			</button>

			<form className="flex flex-1 gap-4" onSubmit={onSendMessage}>
				<input
					className="flex-1 border border-border-light bg-white px-4 py-3 text-[14px] outline-none"
					onChange={(event) => onDraftMessageChange(event.target.value)}
					placeholder="Type your message..."
					type="text"
					value={draftMessage}
				/>
				<button
					className="flex cursor-pointer items-center gap-2 bg-accent px-6 text-[12px] font-bold uppercase tracking-[0.1em] text-black disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isDisabled}
					type="submit"
				>
					Send
				</button>
			</form>

			<button
				className="text-black transition-colors hover:text-muted"
				type="button"
			>
				<Smile size={20} strokeWidth={2} />
			</button>
		</div>
	);
}
