const expres = require('express');
const router = expres.Router();
const { requireSignin, authMiddleware } = require('../controllers/auth');
const { read , publicProfile, update, photo} = require('../controllers/user');

router.get('/user/profile', requireSignin, authMiddleware, read);
router.get('/user/:username', publicProfile);
router.put('/user/update', requireSignin, authMiddleware, update);
router.get('/user/photo/:id', photo);

module.exports = router;
