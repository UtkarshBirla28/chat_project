// Central place for talking to the backend.
// In dev, VITE_API_BASE_URL is empty and requests go through the Vite proxy.
// In production it is the Render backend URL (baked in at build time).
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
export const SOCKET_URL =
	import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

function getToken() {
	try {
		const raw = localStorage.getItem("chat-user");
		return raw ? JSON.parse(raw)?.token : null;
	} catch {
		return null;
	}
}

/**
 * fetch wrapper that prefixes the API base URL, attaches the JWT as a Bearer
 * token (so auth survives cross-domain even when third-party cookies are
 * blocked), and always sends credentials for the cookie fallback.
 */
export async function apiFetch(path, options = {}) {
	const token = getToken();
	const headers = { ...(options.headers || {}) };
	if (token) headers.Authorization = `Bearer ${token}`;

	return fetch(`${API_BASE}${path}`, {
		...options,
		headers,
		credentials: "include",
	});
}
