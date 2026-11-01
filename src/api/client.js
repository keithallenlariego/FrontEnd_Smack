// One place that talks to the Spring Boot API.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const wsUrl = BASE_URL.replace(/^http/, 'ws') + '/ws';

const TOKEN_KEY = 'swc_token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => (token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY));

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Sends JSON, adds the login token, and throws an ApiError with the server's message.
export async function request(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // The token expired or is invalid: log out everywhere.
    if (response.status === 401 && !path.startsWith('/auth/')) {
      setToken(null);
      window.dispatchEvent(new Event('auth:expired'));
    }
    throw new ApiError(response.status, data?.message ?? 'Something went wrong');
  }
  return data;
}
