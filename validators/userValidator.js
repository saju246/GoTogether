const { body } = require("express-validator");

const signupValidation = [
  body("fullname")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full Name should be between 2-50 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email format")
    .normalizeEmail(),

  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must have at least 8 chars, uppercase, lowercase, number, and special char"
    ),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("profileImage")
    .optional()
    .isURL()
    .withMessage("Profile image must be a valid URL"),

  body("role")
    .optional()
    .isIn(["user", "organizer", "admin"])
    .withMessage("Role must be user, organizer, or admin"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid Email required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const editProfileValidation = [
  body("fullname")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Full Name should be between 2-50 characters"),


  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("profileImage")
    .optional()
    .isURL()
    .withMessage("Invalid profile image URL"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be true or false"),
];

const changePasswordValidation = [
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must have at least 8 chars, uppercase, lowercase, number, and special char"
    ),
];

module.exports = {
  signupValidation,
  loginValidation,
  editProfileValidation,
  changePasswordValidation,
};
