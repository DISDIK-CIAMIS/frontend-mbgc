export async function getHomeStats() {
  const commonHeaders = {
    "X-API-KEY": process.env.BACKEND_API_KEY,
    "Accept": "application/json",
  };

  try {
    // Start fetches at the same time
    const [resStats, resSatdik, resBumilstun] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/sppg`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      }),
      fetch(`${process.env.BACKEND_URL}/api/satdik`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      }),
      fetch(`${process.env.BACKEND_URL}/api/bumilstun`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      })
    ]);

    // Check if both responses are okay
    if (!resStats.ok || !resSatdik.ok || !resBumilstun.ok) {
      throw new Error(`Fetch failed: Stats(${resStats.status}), Satdik(${resSatdik.status}), Bumilstun(${resBumilstun.status})`);
    }

    // Parse both JSON bodies
    const [statsJson, satdikJson, bumilstunJson] = await Promise.all([
      resStats.json(),
      resSatdik.json(),
      resBumilstun.json()
    ]);

    const satdikData = satdikJson.data || [];

    // Calculate Total Siswa here
    const totalSiswa = satdikData.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_siswa) || 0);
    }, 0);

    const totalBumilstun = bumilstunJson.data || [];
    const totalBalita = totalBumilstun.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_balita) || 0);
    }, 0);
    const totalBumil = totalBumilstun.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_ibu_hamil) || 0);
    }, 0);
    const totalBusui = totalBumilstun.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_busui) || 0);
    }, 0);
    const totalAnakStunting = totalBumilstun.reduce((acc, curr) => {
      return acc + (Number(curr.jumlah_anak_stunting) || 0);
    }, 0);
    const totalB3 = totalBalita + totalBumil + totalBusui;

    // Return a combined object
    return {
      stats: statsJson.data || [],
      satdik: satdikJson.data || [],
      totalSiswa: totalSiswa,
      totalB3: totalB3,
      totalAnakStunting: totalAnakStunting
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { stats: [], satdik: [], totalSiswa: 0, totalB3: 0, totalAnakStunting: 0 };
  }
}