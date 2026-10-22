import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const assetsDir = join(root, "assets");
const files = readdirSync(assetsDir);

const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));

if (!cssFile || !jsFile) {
  console.error("Could not find bundled CSS or JS in assets/ directory");
  process.exit(1);
}

console.log(`Found production bundle: CSS=${cssFile}, JS=${jsFile}`);

let html = readFileSync(join(root, "index.html"), "utf8");

// Replace dev stylesheet with production stylesheet
html = html.replace(
  /<link rel="stylesheet" href="\/src\/styles\.css"\/>/,
  `<link rel="stylesheet" href="/assets/${cssFile}" />`
);
html = html.replace(
  /<link href="\/@tanstack-start\/styles\.css\?routes=__root__%2C%2F" rel="stylesheet" data-tanstack-router-dev-styles="true"\/>/,
  ""
);

// Replace dev script entries and manifests with production script bundle
html = html.replaceAll(
  "/@id/virtual:tanstack-start-dev-client-entry",
  `/assets/${jsFile}`
);
html = html.replaceAll(
  "/@tanstack-start/styles.css?routes=__root__%2C%2F",
  `/assets/${cssFile}`
);

writeFileSync(join(root, "index.html"), html, "utf8");
writeFileSync(join(root, "404.html"), html, "utf8");
writeFileSync(join(root, ".nojekyll"), "", "utf8");

console.log("Successfully bundled index.html, 404.html, and .nojekyll for GitHub Pages!");
