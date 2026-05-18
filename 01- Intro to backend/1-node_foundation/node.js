//commonJS syntax
// const fs = require("node: fs");
// const path = require("path");
// const os = require("os");

//ES module syntax
import os from "os";

console.log("NodeJS:", process.versions.node);
console.log("V8:", process.versions.v8);
console.log("libuv:", process.versions.uv);
console.log("Platform:", process.platform);
console.log("CPU:", os.cpus().length);
