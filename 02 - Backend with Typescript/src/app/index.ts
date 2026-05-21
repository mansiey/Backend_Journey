import express from 'express';
import type { Application } from 'express';
import todoRouter from './01-todo/routes.js'

export function createServerApplication() : Application {
    const app = express();

    //express doesn't accept json, so we need to solve that issue
    app.use(express.json());
    
    app.use('/todos', todoRouter);

    return app;
}