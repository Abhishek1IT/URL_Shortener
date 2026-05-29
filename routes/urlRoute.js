import express from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controllers/controller.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);

export default router;