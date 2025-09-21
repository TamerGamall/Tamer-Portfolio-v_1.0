const User = require("../Models/user.model");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
} = require("../utils/jwt");
const bcrypt = require("bcrypt");

// ---------------- Sign up for one Time  ----------------
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "Email already in use" });

        const password_hash = await bcrypt.hash(password, 12);

        const user = await User.create({ username, email, password_hash });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ message: "Signed up successfully", accessToken });
    } catch (error) {
        next(error);
    }
};

// ---------------- Login ----------------
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password_hash");
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword)
            return res.status(401).json({ message: "Invalid credentials" });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", accessToken });
    } catch (error) {
        next(error);
    }
};
// ---------------- Refresh Access Token ----------------
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            return res.status(401).json({ message: "Refresh token missing" });

        const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken(decoded.userId);
        console.log(accessToken);


        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
};
// ---------------- Logout ----------------
const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
};


module.exports = {
    signup,
    login,
    refresh,
    logout,
};