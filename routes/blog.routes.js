const express = require('express');
const router = express.Router();

const {
  createBlog,
  readBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');



router.route('/create').post(adminAuth, createBlog);
router.route('/read').get(readBlog);
router.route('/update').put(adminAuth, updateBlog);
router.route('/delete').delete(adminAuth, deleteBlog);

module.exports = router;


