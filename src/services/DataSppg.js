export async function getDataSppg() {
  const commonHeaders = {
    "X-API-KEY": process.env.BACKEND_API_KEY,
    "Accept": "application/json",
  };

  try {
    // Start both fetches at the same time
    const [resSppg] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/sppg`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      })
    ]);

    // Check if both responses are okay
    if (!resSppg.ok) {
      throw new Error(`Fetch failed: Stats(${resSppg.status})`);
    }

    // Parse both JSON bodies
    const [sppgJson] = await Promise.all([
      resSppg.json()
    ]);

    const sppgData = sppgJson.data || [];

    // Hitung Jumlah SPPG
    const jumlahSppg = sppgData.length;

    // Hitung Jumlah SPPG Aktif
    const totalSppgAktif = sppgData.filter(item => item.status === "Aktif").length;

    // Hitung Jumlah SPPG Non-Aktif
    const totalSppgNonAktif = sppgData.filter(item => item.status === "Non-Aktif").length;

    // Hitung Jumlah SPPG Dalam Proses
    const totalSppgDalamProses = sppgData.filter(item => item.status === "Dalam Persiapan").length;

    // Return a combined object
    return {
      totalSppg: jumlahSppg,
      totalSppgAktif: totalSppgAktif,
      totalSppgNonAktif: totalSppgNonAktif,
      totalSppgDalamProses: totalSppgDalamProses,
      sppg: sppgData
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { sppg: [], totalSiswa: 0 };
  }
}