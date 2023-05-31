import express from "express";
const router = express.Router();
import multer from "multer";

// on indique ou stocké les images quand on post une image en ligne
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); //1er la destination de limage
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); //2eme nom du user
  },
});
const upload = multer({ storage: storage });

//route pour poster le fichier en ligne
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("Fichier mis en ligne avec succès");
  } catch (error) {
    console.error(error);
  }
});

export default router;
