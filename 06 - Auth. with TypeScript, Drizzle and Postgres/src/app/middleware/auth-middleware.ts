import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/utils/tokens.js';

export function authMiddleware() {
    return function(req: Request, res: Response, next: NextFunction){
        const header = req.headers['authorization'];
        if(!header) next();

        if(!header?.startsWith('Bearer')){
            return res.status(400).json({error: "The header must start with Bearer!"});
        }

        const token = header.split(" ")[1];
        if(!token) {
            return res.status(400).json({error: "The header must start with Bearer and have a token!"});
        }

        const user = verifyToken(token);
        //@ts-ignore
        req.user = user;
        next();
    }
}