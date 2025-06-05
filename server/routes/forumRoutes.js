import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  addReply,
  deletePost,
  deleteReply
} from '../controllers/forumController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .delete(protect, adminProtect, deletePost);

router.route('/:id/replies')
  .post(protect, addReply);

// Delete a reply from a post
router.delete('/:postId/replies/:replyId', protect, adminProtect, deleteReply);


export default router;
