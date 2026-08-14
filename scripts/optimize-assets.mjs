// Stil notu: Kaynak logodan optimize logo.png (marka işareti) ve og-image.png (1200x630) üretir.
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "client", "src", "assets", "logo-source.png");
const publicDir = path.join(root, "client", "public");

const OGD_WIDTH = 1200;
const OGD_HEIGHT = 630;
const BG = "#0E0B1B";

async function main() {
  await mkdir(publicDir, { recursive: true });

  const logo = await sharp(source).resize(192, 192).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
  await writeFile(path.join(publicDir, "logo.png"), logo);
  console.log("logo.png ->", Math.round(logo.length / 1024), "KB");

  const logoForOg = await sharp(source).resize(256, 256).png().toBuffer();
  const svg = `<svg width="${OGD_WIDTH}" height="${OGD_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OGD_WIDTH}" height="${OGD_HEIGHT}" fill="${BG}"/>
  <rect width="${OGD_WIDTH}" height="1" y="150" fill="#8B5CF6" opacity="0.35"/>
  <text x="0" y="150" dy="-18" font-family="Space Grotesk, Arial, sans-serif" font-size="22" letter-spacing="10" fill="#8B5CF6" opacity="0.9">DLI STUDIOS</text>
  <text x="0" y="614" font-family="DM Sans, Arial, sans-serif" font-size="30" fill="#7f8490">The ecosystem behind your game.</text>
</svg>`;
  const background = await sharp(Buffer.from(svg)).png().toBuffer();
  const ogImage = await sharp(background)
    .composite([{ input: logoForOg, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(publicDir, "og-image.png"), ogImage);
  console.log("og-image.png ->", Math.round(ogImage.length / 1024), "KB");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
