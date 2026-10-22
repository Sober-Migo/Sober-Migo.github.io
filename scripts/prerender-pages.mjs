import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const staticDir = join(process.cwd(), ".vercel/output/static");
mkdirSync(staticDir, { recursive: true });

async function prerender() {
  console.log("[prerender] Starting preview server...");
  const server = spawn("node", ["./node_modules/vite/bin/vite.js", "preview", "--port", "8089", "--host", "127.0.0.1"], {
    stdio: "ignore",
    detached: true,
  });

  let html = "";
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch("http://127.0.0.1:8089/");
      if (res.ok) {
        html = await res.text();
        break;
      }
    } catch {
      // Retry
    }
  }

  try {
    if (server.pid) {
      process.kill(-server.pid);
    }
  } catch {
    try {
      server.kill();
    } catch {
      // Ignored
    }
  }

  if (!html) {
    console.error("[prerender] Failed to fetch HTML from preview server");
    process.exit(1);
  }

  writeFileSync(join(staticDir, "index.html"), html, "utf8");
  writeFileSync(join(staticDir, "404.html"), html, "utf8");
  console.log("[prerender] Successfully generated static index.html and 404.html!");
  process.exit(0);
}

prerender();
