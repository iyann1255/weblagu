"use client";
import { useEffect, useState } from "react";
export default function Home(){
  const [tracks,setTracks]=useState<any[]>([]);
  const [now,setNow]=useState<any>(null);
  useEffect(()=>{fetch("/api/tracks").then(r=>r.json()).then(d=>setTracks(d.tracks||[]));},[]);
  return (
    <main style={{padding:24}}>
      <h2>WebLagu</h2>
      <ul>
        {tracks.map(t=>(
          <li key={t.id}><button onClick={()=>setNow(t)}>{t.title}</button></li>
        ))}
      </ul>
      {now && <audio controls autoPlay src={"/api/stream/"+now.id} />}
    </main>
  );
}
