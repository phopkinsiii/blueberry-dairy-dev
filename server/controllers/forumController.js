// @ts-nocheck
import ForumPost from '../models/forumPostModel.js';

// POST /api/forum
export const createPost = async (req, res) => {
	try {
		const { title, content, author } = req.body;

		if (!req.user || !title || !content) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const post = new ForumPost({
			title,
			content,
			user: req.user._id,
			author: {
				name: author?.trim() || 'Anonymous',
			},
		});

		const savedPost = await post.save();
		res.status(201).json(savedPost);
	} catch (error) {
		console.error('Create post error:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

// GET /api/forum
export const getAllPosts = async (req, res) => {
	try {
		const posts = await ForumPost.find()
			.populate('user', 'name') // still useful for moderation/admin
			.sort({ createdAt: -1 });
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch posts' });
	}
};

// GET /api/forum/:id
export const getPostById = async (req, res) => {
	try {
		const post = await ForumPost.findById(req.params.id).populate('user', 'name');
		if (!post) return res.status(404).json({ message: 'Post not found' });
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch post' });
	}
};

// POST /api/forum/:id/replies
export const addReply = async (req, res) => {
	try {
		const post = await ForumPost.findById(req.params.id);
		if (!post) return res.status(404).json({ message: 'Post not found' });

		post.replies.push({
			user: req.user._id,
			content: req.body.content,
		});

		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Failed to add reply' });
	}
};

// DELETE /api/forum/:id
export const deletePost = async (req, res) => {
	try {
		const post = await ForumPost.findById(req.params.id);
		if (!post) return res.status(404).json({ message: 'Post not found' });

		await ForumPost.findByIdAndDelete(req.params.id);
		res.json({ message: 'Post deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete post' });
	}
};

// DELETE /api/forum/:postId/replies/:replyId
export const deleteReply = async (req, res) => {
	try {
		const post = await ForumPost.findById(req.params.postId);
		if (!post) return res.status(404).json({ message: 'Post not found' });

		const replyIndex = post.replies.findIndex(
			(reply) => reply._id.toString() === req.params.replyId
		);

		if (replyIndex === -1) {
			return res.status(404).json({ message: 'Reply not found' });
		}

		post.replies.splice(replyIndex, 1);
		const updatedPost = await post.save();

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// GET /api/forum/manage — admin-only view of all posts
export const getManageablePosts = async (req, res) => {
	try {
		const posts = await ForumPost.find()
			.populate('user', 'name email')
			.sort({ createdAt: -1 });

		res.json(posts);
	} catch (error) {
		console.error('Error fetching manageable forum posts:', error.message);
		res.status(500).json({ message: 'Failed to fetch manageable posts' });
	}
};

