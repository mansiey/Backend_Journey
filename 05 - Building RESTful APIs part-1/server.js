import 'dotenv/config';
import app from './src/app.js';
import connectDB from './common/config/db.js';

const PORT = process.env.PORT || 5000;

const start = async() => {
    //connect DataBase
    await connectDB();
    app.listen(PORT, () => {
        console.log(`The server is running at ${PORT} in ${NODE_ENV} mode`);
    })
}

start().catch((err) => {
    console.log("Failed to start server.", err);
    process.exit(1);
})