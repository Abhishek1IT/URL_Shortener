import generateShortUrl from "../utils/shortId.js";
import Url from "../models/url.js";

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortUrl = generateShortUrl();

    const shortCode = generateShortUrl();

    const newUrl = new Url({
      originalUrl,
      shortUrl,
    });

    const saved = await newUrl.save();

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const redirectToOriginalUrl = async (req, res) => {
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

const updateShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const urlEntry = await Url.findOneAndUpdate(
      { shortUrl },
      { originalUrl },
      { new: true },
    );

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({
      shortUrl: urlEntry.shortUrl,
      originalUrl: urlEntry.originalUrl,
    });
  } catch (error) {
    console.error("Error updating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const urlEntry = await Url.findOneAndDelete({ shortUrl });

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ message: "Short URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createShortUrl, redirectToOriginalUrl, updateShortUrl, deleteShortUrl };
