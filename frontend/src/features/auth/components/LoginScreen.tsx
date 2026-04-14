import { useState, useTransition } from "react";
import { AuthHeroPanel } from "@/features/auth/components/AuthHeroPanel";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function LoginScreen() {
	const { login } = useAuth();
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isPending, startTransition] = useTransition();

	const isSubmitDisabled = isPending || !identifier.trim() || !password.trim();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		startTransition(async () => {
			try {
				await login({
					identifier: identifier.trim(),
					password: password.trim(),
				});
			} catch (submitError) {
				setError(
					submitError instanceof Error
						? submitError.message
						: "Khong the dang nhap",
				);
			}
		});
	};

	return (
		<div className="min-h-screen bg-page text-black">
			<div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
				<AuthHeroPanel />
				<section className="grid place-items-center">
					<div className="w-full max-w-md border border-black/10 bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.12)] sm:p-10">
						<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
							Sign in
						</p>
						<h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em]">
							Authentication
						</h1>
						<p className="mt-3 max-w-sm text-sm leading-6 text-muted">
							Dang nhap bang username hoac email de vao giao dien chat mau da
							duoc ket noi voi backend auth.
						</p>

						<form className="mt-10 space-y-4" onSubmit={handleSubmit}>
							<label className="block">
								<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
									Username or email
								</span>
								<input
									autoComplete="username"
									className="w-full border border-border-light bg-sidebar px-4 py-3 text-sm outline-none transition focus:border-black"
									onChange={(event) => setIdentifier(event.target.value)}
									placeholder="alice or alice@example.com"
									required
									type="text"
									value={identifier}
								/>
							</label>

							<label className="block">
								<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
									Password
								</span>
								<input
									autoComplete="current-password"
									className="w-full border border-border-light bg-sidebar px-4 py-3 text-sm outline-none transition focus:border-black"
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
									required
									type="password"
									value={password}
								/>
							</label>

							{error ? (
								<p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
									{error}
								</p>
							) : null}

							<button
								className="w-full bg-black px-4 py-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-accent hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
								disabled={isSubmitDisabled}
								type="submit"
							>
								{isPending ? "Signing in..." : "Sign In"}
							</button>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
}
