// Run with: node scripts/publish-evidence.mjs (after the fidelity script)
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

const source = "evidence";
const target = "public/fidelity";

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

let bytes = 0;
for (const entry of readdirSync(source)) {
  const folder = join(source, entry);
  if (!statSync(folder).isDirectory()) continue;
  mkdirSync(join(target, entry), { recursive: true });
  for (const file of readdirSync(folder).filter((name) =>
    name.endsWith(".png"),
  )) {
    const image = sharp(join(folder, file), { limitInputPixels: false });
    const output = join(target, entry, file.replace(/\.png$/, ".webp"));
    await (entry === "sweep" ? image.resize({ width: 360 }) : image)
      .webp({ quality: 60 })
      .toFile(output);
    bytes += statSync(output).size;
  }
}

const html = readFileSync(join(source, "report.html"), "utf8").replace(
  /\.png"/g,
  '.webp"',
);
writeFileSync(join(target, "report.html"), html);
writeFileSync(
  join(target, "report.json"),
  readFileSync(join(source, "report.json")),
);
console.log(`Published ${(bytes / 1e6).toFixed(1)} MB of images to ${target}`);
