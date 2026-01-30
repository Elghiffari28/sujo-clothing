// src/app/api/test/route.js
import { NextResponse } from "next/server";
import sequelize from "@/lib/db";

export async function GET() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    return NextResponse.json({ message: "DB connected & synced ✅" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
