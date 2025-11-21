export async function GET() {
  const [sppgRes, guruRes] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/sppg`, {
      headers: {
        "X-API-KEY": process.env.LARAVEL_API_KEY,
        "Accept": "application/json",
      },
    }),
    // fetch(`${process.env.BACKEND_URL}/api/guru`, {
    //   headers: {
    //     "X-API-KEY": process.env.LARAVEL_API_KEY,
    //     Accept: "application/json",
    //   },
    // }),
    // add more backend calls as needed
  ]);

  const [sppg] = await Promise.all([
    sppgRes.json(),
    // guruRes.json(),
  ]);

  return Response.json({
    totalSppg: 30,
    // totalGuru: guru.length,
    // add more here later
  });
}
