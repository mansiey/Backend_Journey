import fs from 'fs/promises';

const data = await fs.readFile("promises.txt", "utf-8");

console.log(data);