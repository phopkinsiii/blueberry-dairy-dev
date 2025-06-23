import express from 'express';
import {
	createPost,
	getAllPosts,
	getPostById,
	addReply,
	deletePost,
	deleteReply,
	getManageablePosts,
} from '../controllers/forumController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Add limiter

const router = express.Router();

router.route('/').get(getAllPosts).post(protect, authLimiter, createPost); // ✅ Limit post creation

router.get('/manage', protect, adminProtect, getManageablePosts);

router
	.route('/:id')
	.get(getPostById)
	.delete(protect, adminProtect, authLimiter, deletePost); // ✅ Limit delete

router.route('/:id/replies').post(protect, authLimiter, addReply); // ✅ Limit reply creation

router.delete(
	'/:postId/replies/:replyId',
	protect,
	adminProtect,
	authLimiter, // ✅ Limit reply deletion
	deleteReply
);

export default router;
