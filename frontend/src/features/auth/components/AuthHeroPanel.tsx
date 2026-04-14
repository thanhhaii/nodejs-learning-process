const AUTH_PREVIEW_ITEMS = [
	"Feature-based folder structure",
	"Local session persistence",
	"Connected to POST /api/login",
];

export function AuthHeroPanel() {
	return (
		<section className="relative overflow-hidden border border-black/10 bg-black px-6 py-8 text-white shadow-[0_40px_100px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,136,0.24),_transparent_32%),linear-gradient(135deg,_rgba(255,255,255,0.04),_transparent_55%)]" />
			<div className="relative flex h-full flex-col justify-between gap-10">
				<div>
					<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
						Simple Chat App
					</p>
					<h2 className="mt-5 max-w-xl text-5xl font-black uppercase tracking-[-0.05em] sm:text-6xl">
						Editorial chat UI, now wired to real auth.
					</h2>
					<p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
						Frontend da duoc tach nho theo feature, loai bo template Vite mac
						dinh, va giu visual language cua mockup ban dau.
					</p>
				</div>

				<div className="grid gap-3 sm:grid-cols-3">
					{AUTH_PREVIEW_ITEMS.map((item) => (
						<div
							className="border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium"
							key={item}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
