import type { Request, Response } from 'express';
import { signupPayloadModel } from './model.js';
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';

class AuthenticationController {
    public async handleSignup(req:Request, res: Response) {
        const validationResult = await signupPayloadModel.safeParseAsync(req.body);
        if(validationResult.error){
            return res.status(400).json({
                message: "Body validation failed",
                error: validationResult.error.issues,
            });
        }

        const { firstName, lastName, email, password } = validationResult.data;

        //check if the user email already exists in the db
        const userEmail = await db.select().from(usersTable).where(eq(usersTable.email, email));   //return array of detail of the user

        if(userEmail.length > 0) {
            return res.status(401).json({
                error: "Duplicate entry",
                message: `User with email ${email} already exists!`
            })
        }

        //if user doesn't exist, create user
        const salt = randomBytes(32).toString('hex');
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        const [result] = await db.insert(usersTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({id: usersTable.id});

        return res.status(201).json({
            message: 'User is successfully created',
            data: {id: result?.id}
        })

    }




}

export default AuthenticationController;