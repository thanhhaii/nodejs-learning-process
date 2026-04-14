import { LoginScreen } from "@/features/auth/components/LoginScreen";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChatPage } from "@/features/chat/pages/ChatPage";

export function AppShell() {
	const { isReady, session } = useAuth();

	if (!isReady) {
		return <div className="min-h-screen bg-page" />;
	}

	if (!session) {
		return <LoginScreen />;
	}

	return <ChatPage />;
}
