import generateShortUrl from "../utils/shortId.js";
import Url from "../models/url.js";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortUrl = generateShortUrl();

    const newUrl = new Url({
      originalUrl,
      shortUrl,
    });

    await newUrl.save();

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const urlEntry = await Url.findOne({ shortUrl });

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlEntry.clicks += 1;
    await urlEntry.save();
    res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
