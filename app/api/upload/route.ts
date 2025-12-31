import fs from "node:fs";
import path from "node:path";
import { db } from "../../../lib/db";
import { uploadsDir, uid, requireAdmin } from "../../../lib/music";

export async function POST(req: Request) {
  try {
    requireAdmin(req);
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "file required" }, { status: 400 });
    const id = uid();
    const ext = path.extname(file.name) || ".bin";
    const name = id + ext;
    fs.writeFileSync(path.join(uploadsDir, name), Buffer.from(await file.arrayBuffer()));
    db.prepare("INSERT INTO tracks VALUES (?,?,?,?,?,?)")
      .run(id, file.name, "Unknown", name, file.type, file.size, Date.now());
    return Response.json({ ok: true });
  } catch (e:any) {
    return Response.json({ error: e.message }, { status: e.status||500 });
  }
}
