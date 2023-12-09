export async function checkAuthStatus() {
	const token = localStorage.getItem("token") || null;

	if (token) {
		return true;
	}

	return false;
}

export default function handleLogout() {
	localStorage.removeItem("authToken");
	window.location.href = "/";
}
