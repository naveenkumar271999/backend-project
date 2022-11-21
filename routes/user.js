const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
let path = require('path');
const UserCtrl = require('../controllers/user');
const { catchError } = require('../controllers/error');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


router.get('/all', catchError(UserCtrl.getAllUser));

// SignUp
router.post('/register', upload.single('image'), catchError(UserCtrl.signUp));

// Login
router.post('/login', catchError(UserCtrl.login));

// Edit own profile
router.post('/me', UserCtrl.checkAuth, catchError(UserCtrl.editMe));

// Edit own profile
router.get('/me', UserCtrl.checkAuth, catchError(UserCtrl.getMe));

module.exports = router;
