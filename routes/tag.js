const expres = require('express');
const router = expres.Router();
const { create, list, read, remove, listAll } = require('../controllers/tag');

//validators
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');
const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post(
  '/tag',
  tagCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get('/tags', listAll);
router.get('/tags/:slug', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
