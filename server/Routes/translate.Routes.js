const Router = require("express").Router;
const axios = require("axios");
const SiteContent = require("../Models/siteContent.model");

let router = Router();

router.post("/", async (req, res) => {
    const { targetLang } = req.body;
    console.log("targetLang:", targetLang);
    try {
        const content = await SiteContent.findOne();
        if (!content) return res.status(404).json({ message: "No site content found" });

        const translateText = async (text, source, target) => {
            if (!text) return "";
            const response = await axios.post("https://libretranslate.de/translate", {
                q: text,
                source,
                target,
                format: "text"
            }, { headers: { "Content-Type": "application/json" } });
            return response.data.translatedText;
        };

        const translatedContent = { ...content._doc };
        translatedContent.heroSection.title = await translateText(content.heroSection.title, "auto", targetLang);
        translatedContent.heroSection.subtitle = await translateText(content.heroSection.subtitle, "auto", targetLang);
        translatedContent.heroSection.description = await translateText(content.heroSection.description, "auto", targetLang);

        res.json({ success: true, data: translatedContent });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Translation failed" });
    }
});

module.exports = router;
