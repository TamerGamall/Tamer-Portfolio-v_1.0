const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    heroSection: {
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String },
        heroImage: { type: String },   // صورة البروفايل أو الكفر
        backgroundImage: { type: String } // صورة خلفية الكفر
    },
    aboutSection: {
        aboutMe: { type: String },
        profileImage: { type: String }, // صورة شخصية
        skills: [{ type: String }]
    },
    contactSection: {
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        socialLinks: {
            github: { type: String },
            linkedin: { type: String },
            twitter: { type: String },
            facebook: { type: String },
            instagram: { type: String }
        }
    },
    siteSettings: {
        logo: { type: String },   // لوجو الموقع
        favicon: { type: String }, // أيقونة التاب
        footerText: { type: String }
    }
}, { timestamps: true });

const SiteContent = mongoose.model('SiteContent', siteContentSchema);
module.exports = SiteContent;
