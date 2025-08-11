const express = require('express');
const authRouter = express.Router();

const { signupValidation, loginValidation } = require('../validators/userValidator');
const { validateRequest } = require('../middlewares/authMiddleware');
const { signUpUser, loginUser, logoutUser } = require('../controllers/authController');


authRouter.post('/signup', signupValidation, validateRequest, signUpUser);

authRouter.post('/login', loginValidation, validateRequest, loginUser);

authRouter.post('/logout', logoutUser);




module.exports = authRouter;
