import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
export const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
export const uid = () => crypto.randomUUID();
export function requireAdmin(req: Request) {
  const t = process.env.ADMIN_TOKEN;
  if (!t) throw new Error("ADMIN_TOKEN not set");
  if (req.headers.get("x-admin-token") !== t) {
    const e:any = new Error("Unauthorized"); e.status=401; throw e;
  }
}
