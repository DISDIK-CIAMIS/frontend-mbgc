export async function getPenerimaManfaat() {
  const commonHeaders = {
    "X-API-KEY": process.env.BACKEND_API_KEY,
    "Accept": "application/json",
  };

  try {
    const [resSatdik, resBumilstun] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/api/satdik`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      }),
      fetch(`${process.env.BACKEND_URL}/api/bumilstun`, { 
        headers: commonHeaders, 
        cache: "no-store" 
      })
    ]);

    if (!resSatdik.ok || !resBumilstun.ok) {
      throw new Error(`Fetch failed: Satdik(${resSatdik.status}), Bumilstun(${resBumilstun.status})`);
    }

    const [satdikJson, bumilstunJson] = await Promise.all([
      resSatdik.json(),
      resBumilstun.json()
    ]);

    const satdikData = satdikJson.data || [];
    const bumilstunData = bumilstunJson.data || [];

    // --- State untuk Hirarki Wilayah ---
    const hirarkiWilayah = {};

    const getKecamatanObj = (namaKec) => {
      const kec = (namaKec || "TIDAK DIKETAHUI").trim();
      if (!hirarkiWilayah[kec]) {
        hirarkiWilayah[kec] = {
          namaKecamatan: kec,
          totalSekolahKec: 0,
          totalSiswaKec: 0,
          totalBalitaKec: 0,
          totalBumilKec: 0,
          totalBusuiKec: 0,
          totalAnakStuntingKec: 0,
          daftarDesa: {}
        };
      }
      return hirarkiWilayah[kec];
    };

    const getDesaObj = (kecObj, namaDesa) => {
      const desa = (namaDesa || "TIDAK DIKETAHUI").trim();
      if (!kecObj.daftarDesa[desa]) {
        kecObj.daftarDesa[desa] = {
          namaDesa: desa,
          jumlahSekolah: 0,
          jumlahSiswa: 0,
          jumlahBalita: 0,
          jumlahBumil: 0,
          jumlahBusui: 0,
          jumlahAnakStunting: 0
        };
      }
      return kecObj.daftarDesa[desa];
    };

    // --- 1. PROSES DATA SATDIK (Siswa, Jenjang, & Wilayah) ---
    const summarySiswa = satdikData.reduce((acc, curr) => {
      const bentuk = (curr.bentuk_pendidikan || "");
      const jml = parseInt(curr.jumlah_siswa || 0);
      
      // Update Summary Jenjang
      if (["KB", "SPS", "TK", "TPA", "RA"].includes(bentuk)) {
        acc.jumlahSiswaPAUD += jml;
        acc.jumlahSekolahPAUD += 1;
      } else if (["SD", "MI"].includes(bentuk)) {
        acc.jumlahSiswaSD += jml;
        acc.jumlahSekolahSD += 1;
      } else if (["SMP", "MTs"].includes(bentuk)) {
        acc.jumlahSiswaSMP += jml;
        acc.jumlahSekolahSMP += 1;
      } else if (["SMA", "SMK", "MA"].includes(bentuk)) {
        acc.jumlahSiswaSMA += jml;
        acc.jumlahSekolahSMA += 1;
      }
      acc.totalSiswa += jml;
      acc.totalSekolah += 1;

      // Update Hirarki Wilayah
      const kec = getKecamatanObj(curr.kecamatan);
      const desa = getDesaObj(kec, curr.desa);
      
      desa.jumlahSekolah += 1;
      desa.jumlahSiswa += jml;
      kec.totalSekolahKec += 1;
      kec.totalSiswaKec += jml;

      return acc;
    }, {
      jumlahSiswaPAUD: 0, jumlahSiswaSD: 0, jumlahSiswaSMP: 0, jumlahSiswaSMA: 0, totalSiswa: 0,
      jumlahSekolahPAUD: 0, jumlahSekolahSD: 0, jumlahSekolahSMP: 0, jumlahSekolahSMA: 0, totalSekolah: 0
    });

    // --- 2. PROSES DATA BUMILSTUN (Ibu, Anak, & Wilayah) ---
    const summaryBumilstun = bumilstunData.reduce((acc, curr) => {
      const buma = parseInt(curr.jumlah_balita || 0);
      const bumi = parseInt(curr.jumlah_ibu_hamil || 0);
      const busu = parseInt(curr.jumlah_busui || 0);
      const stun = parseInt(curr.jumlah_anak_stunting || 0);

      // Update Global Summary
      acc.totalBalita += buma;
      acc.totalBumil += bumi;
      acc.totalBusui += busu;
      acc.totalAnakStunting += stun;

      // Update Hirarki Wilayah
      const kec = getKecamatanObj(curr.kecamatan);
      const desa = getDesaObj(kec, curr.desa);

      desa.jumlahBalita += buma;
      desa.jumlahBumil += bumi;
      desa.jumlahBusui += busu;
      desa.jumlahAnakStunting += stun;

      kec.totalBalitaKec += buma;
      kec.totalBumilKec += bumi;
      kec.totalBusuiKec += busu;
      kec.totalAnakStuntingKec += stun;

      return acc;
    }, {
      totalBalita: 0, totalBumil: 0, totalBusui: 0, totalAnakStunting: 0
    });

    // Transformasi daftarDesa dari Object ke Array agar rapi
    const dataHirarki = Object.values(hirarkiWilayah).map(kec => ({
      ...kec,
      daftarDesa: Object.values(kec.daftarDesa)
    }));

    return {
      satdik: satdikData,
      bumilstun: bumilstunData,
      summarySiswa,
      summaryBumilstun,
      summaryWilayah: dataHirarki
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { 
      satdik: [], 
      bumilstun: [], 
      summarySiswa: { totalSiswa: 0, totalSekolah: 0 },
      summaryBumilstun: { totalBalita: 0, totalBumil: 0, totalBusui: 0, totalAnakStunting: 0 },
      summaryWilayah: []
    };
  }
}