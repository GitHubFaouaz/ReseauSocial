import express from "express";
import { getData } from "../Controllers/InfoWorldApi";
const router = express.Router();

router.get('/', getData)

export default router;