// console.log("Hello, From TS file, how you doingg??!!")

// import express from 'express'
// // const express = require('express')

// const app = express();

import http from 'node:http';
import { env } from './env.js';
import { createServerApplication } from './app/index.js';

async function main() {
    try {
        const server = http.createServer(createServerApplication());
        // const PORT = process.env.PORT ? +process.env.PORT : 8080;
        const PORT = env.PORT ? +env.PORT : 8080;

        server.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`);
        })
    } catch (err) {
        throw err;
    }
}

main();