import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./module/auth/auth.routes.js";
import multer from "multer";
import APIResponses from "./common/utils/api-res.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//custom middleware
app.use("/api/auth", authRoutes);





//to preserve the extension in disk storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + " - " + Math.round(Math.random());
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + " - " + uniqueSuffix + ext);
  },
});

//by default the memory storage is used, but to use it explicitely,

// const storage = multer.memoryStorage();

// const upload = multer({ storage });

//single() method

// app.post("/profile", upload.single("profilePicture"), (req, res) => {
//     const getFile = req.file;
//     console.log(getFile);

//     APIResponses.ok(res, "File uploaded successfully!");
// })

//array() method

// app.post("/photos", upload.array("photos"), (req, res) => {
//     const getFiles = req.files;
//     console.log(getFiles);

//     APIResponses.ok(res, "Photos Uploaded!");
// })



// file size limit

const upload = multer({
  storage, limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb)=> {
  const allowed = ["image/png", "image/jpeg", "application/pdf"]

  if(allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported", false));
  }
  }
});

app.post("/profile", (req, res) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res.send( "FIle size too large!");
    }

    if(err) {
        return res.send(err.message);
    }

    const getFile = req.file;
    console.log(getFile);

    return res.send("File uploaded!");
  });
});

export default app;
