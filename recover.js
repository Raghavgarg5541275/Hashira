const fs = require("fs");

const fileContent = fs.readFileSync("shares1.json", "utf8");
const data = JSON.parse(fileContent);

let shares = [];
for (let id in data) {
  if (id === "keys") continue; 

  const base = Number(data[id].base);
  const yVal = parseInt(data[id].value, base);
  shares.push([Number(id), yVal]);
}

console.log("Decoded shares:", shares);

const k = data.keys.k;
const selected = shares.slice(0, k);
console.log("Using points:", selected);

function getConstant(points) {
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const [xj] = points[j];
      term *= (0 - xj) / (xi - xj);
    }

    result += term;
  }

  return result;
}

const secret = getConstant(selected);
console.log("Secret (c):", secret);