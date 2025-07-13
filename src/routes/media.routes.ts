import {
    deleteFile,
    uploadMulti,
    uploadOne,
} from "../controllers/media.controller";
import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as createUUID } from "uuid";

import fs from "fs";
if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
}

const mediaRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        const mediaId = createUUID().toUpperCase();
        const ext = path.extname(file.originalname);
        const filename = `${mediaId}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

mediaRouter.post("/upload", upload.single("file"), uploadOne);
mediaRouter.post("/upload/multiple", upload.array("files"), uploadMulti);
mediaRouter.delete("/:mediaId", deleteFile);

export default mediaRouter;
