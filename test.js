import fs from "fs";
const content = fs.readFileSync("./data/Postnummerregister-ansi.txt", "utf8");
let res = new Map();
const data = content.split("\n").map((line) => {
  const [zipcode, city] = line.split("\t");
  res.set(zipcode, city);
});

console.log(res);
