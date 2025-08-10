const { body } = require("express-validator");

const signupValidation = [
  body("firstName")
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name should be 2-50 characters"),
  body("lastName").optional().isLength({ max: 50 }),
  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .normalizeEmail(),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be strong (min 8 chars, uppercase, lowercase, number, special char)"),
  body("role")
    .optional()
    .isIn(["traveler", "organizer"])
    .withMessage("Role must be traveler or organizer"),
  body("age")
    .optional()
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other"]),
  body("profileImage")
    .optional()
    .isURL()
    .withMessage("Invalid Profile Image URL"),
  body("about")
    .optional()
    .isLength({ max: 300 })
    .withMessage("About section max length is 300 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid Email required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password required"),
];

const editProfileValidation = [
  body("firstName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name should be 2-50 characters"),
  body("lastName").optional().isLength({ max: 50 }),
  body("profileImage").optional().isURL().withMessage("Invalid Profile Image URL"),
  body("about")
    .optional()
    .isLength({ max: 300 })
    .withMessage("About section max length is 300 characters"),
  body("gender").optional().isIn(["male", "female", "other"]),
  body("age").optional().isInt({ min: 18 }),
];

const organizerKYCValidation = [
  body("kycVerified")
    .isBoolean()
    .withMessage("KYC status must be true or false"),
];

const bookingValidation = [
  body("tripId")
    .notEmpty()
    .withMessage("Trip ID is required")
    .isMongoId()
    .withMessage("Invalid Trip ID"),
  body("paymentDetails.razorpayOrderId")
    .notEmpty()
    .withMessage("Razorpay Order ID required"),
  body("paymentDetails.razorpayPaymentId")
    .notEmpty()
    .withMessage("Razorpay Payment ID required"),
  body("paymentDetails.razorpaySignature")
    .notEmpty()
    .withMessage("Razorpay Signature required"),
  body("paymentDetails.amount")
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive number"),
  body("paymentDetails.currency")
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage("Invalid currency code"),
];

const changePasswordValidation = [
  body("password")
    .isStrongPassword()
    .withMessage("Password must be strong (min 8 chars, uppercase, lowercase, number, special char)"),
];

module.exports = {
  signupValidation,
  loginValidation,
  editProfileValidation,
  organizerKYCValidation,
  bookingValidation,
  changePasswordValidation,
};
