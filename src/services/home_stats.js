export async function getHomeStats() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sppg`, {
    headers: {
      "X-API-KEY": process.env.LARAVEL_API_KEY,
      "Accept": "application/json",
    },
    cache: "no-store",
    // next: { revalidate: 300 }, // Update setiap 5 menit
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Home Stats data: ${res.status}`);
  }

  const json = await res.json();
  return json.data || [];
}