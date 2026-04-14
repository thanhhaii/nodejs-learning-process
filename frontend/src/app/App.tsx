import { AppShell } from "@/app/AppShell";
import { AuthProvider } from "@/app/providers/AuthProvider";

export function App() {
	return (
		<AuthProvider>
			<AppShell />
		</AuthProvider>
	);
}
