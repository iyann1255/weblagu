import { db } from "../../../lib/db";
export async function GET() {
  const rows = db.prepare("SELECT * FROM tracks ORDER BY created_at DESC").all();
  return Response.json({ tracks: rows });
}
