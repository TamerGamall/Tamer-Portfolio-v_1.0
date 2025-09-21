const User = require("../Models/user.model");
const { verifyToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "you are not authenticated" });
    }

    let payLoad = verifyToken(token, process.env.JWT_ACCESS_SECRET);
    if (!payLoad) {
        return res.status(401).json({ message: "invalid token" });
    }

    let user = await User.findById(payLoad.userId);
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    req.user = payLoad;
    next();
};

module.exports = authenticate;
