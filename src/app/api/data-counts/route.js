import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.BACKEND_URL || !process.env.LARAVEL_API_KEY) {
      throw new Error("BACKEND_URL or LARAVEL_API_KEY is not set");
    }

    const sppgRes = await fetch(`${process.env.BACKEND_URL}/api/sppg`, {
      headers: {
        "X-API-KEY": process.env.LARAVEL_API_KEY,
        Accept: "application/json", // 🔁 turn this back on
      },
      // cache: "no-store", // optional, if you always want fresh
    });

    if (!sppgRes.ok) {
      const errorText = await sppgRes.text();
      console.error("SPPG API error:", sppgRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch sppg", status: sppgRes.status },
        { status: 500 }
      );
    }

    const sppgData = await sppgRes.json();

    // Handle either plain array or `{ data: [...] }`
    const totalSppg = Array.isArray(sppgData)
      ? sppgData.length
      : Array.isArray(sppgData.data)
      ? sppgData.data.length
      : 0;

    return NextResponse.json({ totalSppg });
  } catch (err) {
    console.error("Route /api/... GET error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
