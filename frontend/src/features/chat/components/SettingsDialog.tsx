import { X } from "lucide-react";
import type { ChatProfile } from "@/features/chat/types/chat.types";

type SettingsDialogProps = {
	draftUser: ChatProfile;
	onCancel: () => void;
	onChange: (draft: ChatProfile) => void;
	onSave: () => void;
};

export function SettingsDialog({
	draftUser,
	onCancel,
	onChange,
	onSave,
}: SettingsDialogProps) {
	return (
		<div className="fixed inset-0 z-50 grid place-items-center bg-black/20 px-4 backdrop-blur-sm">
			<div className="relative flex w-full max-w-[480px] flex-col border border-border-light bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
				<div className="flex items-center justify-between border-b border-border-light bg-sidebar p-6">
					<h2 className="text-[18px] font-extrabold uppercase tracking-tight">
						Settings
					</h2>
					<button
						className="text-muted transition-colors hover:text-black"
						onClick={onCancel}
						type="button"
					>
						<X size={20} strokeWidth={2} />
					</button>
				</div>

				<div className="space-y-6 p-8">
					<div className="flex items-center gap-6">
						<img
							alt="Avatar Preview"
							className="h-16 w-16 rounded-full border border-border-light object-cover grayscale"
							src={draftUser.avatar}
						/>
						<div className="flex-1">
							<label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
								Avatar URL
							</label>
							<input
								className="w-full border border-border-light bg-white p-3 text-[14px] outline-none"
								onChange={(event) =>
									onChange({ ...draftUser, avatar: event.target.value })
								}
								type="text"
								value={draftUser.avatar}
							/>
						</div>
					</div>

					<label className="block">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
							Display name
						</span>
						<input
							className="w-full border border-border-light bg-white p-3 text-[14px] outline-none"
							onChange={(event) =>
								onChange({ ...draftUser, name: event.target.value })
							}
							type="text"
							value={draftUser.name}
						/>
					</label>

					<label className="block">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
							Status
						</span>
						<input
							className="w-full border border-border-light bg-white p-3 text-[14px] outline-none"
							onChange={(event) =>
								onChange({ ...draftUser, status: event.target.value })
							}
							type="text"
							value={draftUser.status}
						/>
					</label>

					<label className="block">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
							Password
						</span>
						<input
							className="w-full border border-border-light bg-white p-3 text-[14px] outline-none"
							onChange={(event) =>
								onChange({ ...draftUser, password: event.target.value })
							}
							type="password"
							value={draftUser.password}
						/>
					</label>
				</div>

				<div className="flex justify-end gap-4 border-t border-border-light bg-sidebar p-6">
					<button
						className="cursor-pointer px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-muted hover:text-black"
						onClick={onCancel}
						type="button"
					>
						Cancel
					</button>
					<button
						className="cursor-pointer bg-black px-8 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent hover:text-black"
						onClick={onSave}
						type="button"
					>
						Save changes
					</button>
				</div>
			</div>
		</div>
	);
}
