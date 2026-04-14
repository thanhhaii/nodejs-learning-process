function getEnvValue(key: keyof ImportMetaEnv, fallback = "") {
	return import.meta.env[key] ?? fallback;
}

export const env = {
	apiBaseUrl: getEnvValue("VITE_API_BASE_URL", "http://localhost:8080/api"),
	wsBaseUrl: getEnvValue("VITE_WS_BASE_URL", "ws://localhost:8080"),
};
