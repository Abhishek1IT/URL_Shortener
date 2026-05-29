import express from "express";
import {
	createShortUrl,
	redirectToOriginalUrl,
	updateShortUrl,
	deleteShortUrl,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);
router.put("/:shortUrl", updateShortUrl);
router.delete("/:shortUrl", deleteShortUrl);

export default router;