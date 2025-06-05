import express from 'express';
import {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
} from '../controllers/blogController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', getPostById);
router.get('/', getAllPosts);

//Protected Routes
//Create new post
router.post('/', protect, adminProtect, createPost);
//Get all posts route

//Get single post by id

//Update Post
router.put('/:id', protect, adminProtect, updatePost);

//Delete Post
router.delete('/:id', protect, adminProtect, deletePost);

export default router;
