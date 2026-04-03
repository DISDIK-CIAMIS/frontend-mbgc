export async function getHomeStats() {
  const commonHeaders = {
    "X-API-KEY": process.env.BACKEND_API_KEY,
    "Accept": "application/json",
  };

  try {
    // Start both fetches at the same time
    const [resStats, resSatdik] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/sppg`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      }),
      fetch(`${process.env.BACKEND_URL}/api/satdik`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      })
    ]);

    // Check if both responses are okay
    if (!resStats.ok || !resSatdik.ok) {
      throw new Error(`Fetch failed: Stats(${resStats.status}), Satdik(${resSatdik.status})`);
    }

    // Parse both JSON bodies
    const [statsJson, satdikJson] = await Promise.all([
      resStats.json(),
      resSatdik.json()
    ]);

    const satdikData = satdikJson.data || [];

    // Calculate Total Siswa here
    const totalSiswa = satdikData.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_siswa) || 0);
    }, 0);

    // Return a combined object
    return {
      stats: statsJson.data || [],
      satdik: satdikJson.data || [],
      totalSiswa: totalSiswa
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { stats: [], satdik: [], totalSiswa: 0 };
  }
}