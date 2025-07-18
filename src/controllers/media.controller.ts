import ResponseService from "../utils/response.utils";
import path from "path";
import fs from "fs/promises";
import { Request, Response } from "express";

interface MulterRequest extends Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
}

export const uploadOne = (req: MulterRequest, res: Response) => {
    try {
        const file = req.file;

        const filename = file?.filename;
        const fileUrl = `${req.protocol}://${req.get(
            "host"
        )}/media/${filename}`;
        ResponseService.success(
            res,
            { url: fileUrl },
            "File uploaded successfully",
            201
        );
    } catch (err) {
        console.error("error while uploading single file: ", err);
        ResponseService.error(res, "something went wrong", 500, err);
    }
};

export const uploadMulti = (req: MulterRequest, res: Response) => {
    try {
        const files = req.files;
        if (!files || !Array.isArray(files))
            return ResponseService.error(res, "No file Found", 400, {});
        const fileUrls = files.map((file) => {
            const filename = file?.filename;
            const fileUrl = `${req.protocol}://${req.get(
                "host"
            )}/media/${filename}`;
            return fileUrl;
        });

        ResponseService.success(
            res,
            { urls: fileUrls },
            "Files uploaded successfully",
            201
        );
    } catch (err) {
        console.error("error while uploading multi file: ", err);
        ResponseService.error(res, "something went wrong", 500, err);
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    try {
        const { mediaId } = req.params;
        const files = await fs.readdir("media");

        // Try to find the file that starts with the given name
        const matchingFile = files.find(
            (file) => path.parse(file).name === mediaId
        );

        if (!matchingFile) {
            console.log(`No file found with base name: ${mediaId}`);
            return;
        }

        const filePath = path.join("media", matchingFile);
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
        ResponseService.success(res, {}, "File Deleted Successfully", 200);
    } catch (err) {
        console.error("Error deleting file:", err);
        ResponseService.error(res, "something went wrong", 500, err);
    }
};
