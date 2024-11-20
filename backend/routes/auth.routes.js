const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
