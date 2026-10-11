export async function obtenerAPI(url) {
  const res = await fetch(url);
  const response = await res.json();
  return response;
}
