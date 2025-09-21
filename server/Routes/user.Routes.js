const Router = require("express").Router
const { body } = require("express-validator");
const {
    signup,
    login,
    refresh,
    logout,
} = require("../Controllers/user.controller");
const validate = require("../middlewares/validation.middleware");
let userRoutres = Router();
userRoutres.post(
    "/login",
    validate([
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
    ]),
    login
).post("/refresh", refresh).post("/logout", logout);
// userRoutres.post(
//     "/signup",
//     validate([
//         body("username")
//             .notEmpty()
//             .withMessage("Username is required")
//             .isLength({ max: 30 })
//             .withMessage("Username must be at most 30 characters long"),
//         body("email")
//             .notEmpty()
//             .withMessage("Email is required")
//             .isEmail()
//             .withMessage("Invalid email format"),
//         body("password")
//             .notEmpty()
//             .withMessage("Password is required")
//             .isLength({ min: 8 })
//             .withMessage("Password must be at least 8 characters long"),
//     ]),
//     signup
// );
module.exports = userRoutres;
