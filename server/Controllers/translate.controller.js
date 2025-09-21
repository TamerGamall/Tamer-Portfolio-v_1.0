const SiteContent = require('../Models/siteContent.model');
const axios = require("axios");

const translateAPI = async (req, res) => {
    const { targetLang } = req.body; // "ar" أو "en"

    try {
        // 1- هات المحتوى من الداتابيز
        const content = await SiteContent.findOne();

        if (!content) {
            return res.status(404).json({ message: "No site content found" });
        }
        // 2- دالة صغيرة تترجم النصوص
        const translateText = async (text, source, target) => {
            if (!text) return "";
            const response = await axios.post("https://libretranslate.com/translate", {
                q: text,
                source,
                target,
                format: "text"
            }, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data.translatedText;
        };
        // 3- اعمل نسخة جديدة مترجمة
        const translatedContent = { ...content._doc };

        translatedContent.heroSection.title = await translateText(content.heroSection.title, "auto", targetLang);
        translatedContent.heroSection.subtitle = await translateText(content.heroSection.subtitle, "auto", targetLang);
        translatedContent.heroSection.description = await translateText(content.heroSection.description, "auto", targetLang);

        translatedContent.aboutSection.aboutMe = await translateText(content.aboutSection.aboutMe, "auto", targetLang);
        translatedContent.aboutSection.skills = await Promise.all(
            content.aboutSection.skills.map(s => translateText(s, "auto", targetLang))
        );
        // باقي الحقول برضو ممكن تعملها بنفس الطريقة

        res.json({ success: true, data: translatedContent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Translation failed" });
    }
};

module.exports = { translateAPI };