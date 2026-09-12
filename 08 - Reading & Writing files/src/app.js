import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './module/auth/auth.routes.js';
import multer from 'multer';
import APIResponses from './common/utils/api-res.js';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//custom middleware
app.use('/api/auth', authRoutes);




//to preserve the extension
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + ' - ' + Math.round(Math.random());
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + ' - ' + uniqueSuffix + ext);
    }
})

const upload = multer({ storage });

app.post("/profile", upload.single("profilePicture"), (req, res) => {
    const getFile = req.file;
    console.log(getFile);

    APIResponses.ok(res, "File uploaded successfully!");
})


export default app;