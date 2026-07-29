import express from 'express';
import type { Express } from 'express';

export function createApplication() : Express {
    const app = express();

    //middlewares 




    //Routes
    app.get('/', (req, res) => {
        return res.json({message: "Hello from the ChaiCode Auth Service"});
    })



    return app;
}