const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export async function fetchSection(key) {
  const response = await fetch(`${BASE_URL}/${key}`);
  if (!response.ok) {
    throw new Error(`Failed to load "${key}" (${response.status})`);
  }
  return response.json();
}
