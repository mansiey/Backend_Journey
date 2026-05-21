import { ca } from "zod/locales";
import { todoValidationSchema, type Todo } from "../../validation/todo.schema.js";
import type { Request, Response } from 'express';


class todoController {
    private _db !: Todo[];

    constructor(){
        this._db = [];
    }

    public handleAllTodos(req: Request, res: Response){
        const todos = this._db;
        return res.json({ todos });
    }

    public async insertTodo(req: Request, res: Response){
        try{
            const invalidData = req.body;
            const validationResult = await todoValidationSchema.parseAsync(invalidData);
            this._db.push(validationResult);
            return res.status(201).json({ todo: validationResult});
        } catch(err) {
            return res.status(501).json({ err })
        }
    }
}

export default todoController;