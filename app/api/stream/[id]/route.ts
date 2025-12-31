import fs from "node:fs";
import path from "node:path";
import { db } from "../../../../lib/db";
import { uploadsDir } from "../../../../lib/music";

export async function GET(req: Request, ctx:{params:Promise<{id:string}>}) {
  const { id } = await ctx.params;
  const row:any = db.prepare("SELECT filename,mime FROM tracks WHERE id=?").get(id);
  if (!row) return new Response("Not found",{status:404});
  const filePath = path.join(uploadsDir, row.filename);
  const stat = fs.statSync(filePath);
  const size = stat.size;
  const range = req.headers.get("range");
  if (!range) {
    return new Response(fs.createReadStream(filePath) as any, {
      headers: { "Content-Type": row.mime, "Content-Length": String(size) }
    });
  }
  const [s,e] = range.replace("bytes=","").split("-");
  const start = Number(s);
  const end = e?Number(e):size-1;
  return new Response(fs.createReadStream(filePath,{start,end}) as any,{
    status:206,
    headers:{
      "Content-Type": row.mime,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges":"bytes"
    }
  });
}
