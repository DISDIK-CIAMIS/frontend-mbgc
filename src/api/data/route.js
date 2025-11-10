export async function GET() {
  // You can read from DB here; for now we return static JSON:
  const data = [
    { kecamatan: "Ciamis", provinsi: "Jawa Barat", penduduk: 5000, desa: [] },
    { kecamatan: "Cijeungjing", provinsi: "Jawa Barat", penduduk: 3200, desa: [] }
  ];
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}