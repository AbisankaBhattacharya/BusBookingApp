export function getUserEmailFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}
