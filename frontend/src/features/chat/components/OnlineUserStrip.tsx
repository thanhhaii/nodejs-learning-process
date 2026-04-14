import type { PresenceUser } from "@/features/chat/types/chat.types";

type OnlineUserStripProps = {
	users: PresenceUser[];
};

export function OnlineUserStrip({ users }: OnlineUserStripProps) {
	return (
		<div
			className="flex gap-[10px] overflow-x-auto"
			style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
		>
			{users.map((user) => (
				<div
					className="group flex shrink-0 cursor-pointer flex-col items-center"
					key={user.id}
				>
					<div className="relative">
						<img
							alt={user.name}
							className="h-10 w-10 rounded-full border-2 border-accent bg-[#ddd] object-cover"
							src={user.avatar}
						/>
						<span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-accent" />
					</div>
				</div>
			))}
		</div>
	);
}
