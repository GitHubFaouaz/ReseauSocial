import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import "./db.js";
import cors from "cors";
import morgan from "morgan";

// routes
import authRoutes from "./routers/AuthRoute.js";
import userRoutes from "./routers/UserRoute.js";
import PostRoute from "./routers/PostRoute.js";
import UploadRoute from "./routers/UploadRoute.js";

const app = express();
// dotenv.config();

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// permet de voir les requettes Get ,Post sur le terminal
app.use(morgan("tiny"));
app.use(express.json());

// to serve images inside public folder
// pour servir des images dans un dossier public ainsi on peut acceder au images du serveur pour le front end
// Express recherche les fichiers relatifs au répertoire statique, de sorte que le nom du répertoire(public) statique ne fait pas partie de l'URL.
app.use(express.static("public"));
app.use("/images", express.static("images"));
// app.use("/images", express.static("public"));

//.................................................. ROUTES ..............................
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute); // traitement de limage avec multer ainsi

export default app;
