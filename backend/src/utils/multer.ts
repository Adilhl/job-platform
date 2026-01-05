import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir = "upload/resumes"

//check for directory if exists

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive:true});
}

export const resumeUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),
        filename: (req, file, cb) => {
            const ext =  path.extname(file.originalname);
            const name = file.fieldname + "-" + Date.now() + ext;
            cb(null, name);
        },
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext != ".pdf") return cb(new Error("Sorry, but only PDF file are allowed"));
        cb(null, true);
    },
    limits:{
        fileSize: 5* 1024 * 1024,
    },
})