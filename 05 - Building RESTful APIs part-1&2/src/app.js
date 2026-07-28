import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './module/auth/auth.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//custom middleware
app.use('/api/auth', authRoutes);

export default app;