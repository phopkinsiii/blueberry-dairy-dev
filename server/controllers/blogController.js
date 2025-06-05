// @ts-nocheck
import Blog from '../models/blogModel.js';

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Blog.find().sort({ createdAt: -1 }); // Newest first
		res.json(posts);
	} catch (error) {
		next(error);
	}
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/:id
// @access  Public
// @desc    Get single blog post by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getPostById = async (req, res, next) => {
	try {
		const post = await Blog.findById(req.params.id).populate('author', 'name role');
		
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};


// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Admin

export const createPost = async (req, res, next) => {
	try {
		const { title, content, tags, image, published } = req.body;
		const newPost = new Blog({
			title,
			content,
			tags: tags || [],
			image,
			published,
			author: req.user._id,
		});
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		next(error);
	}
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Admin
export const updatePost = async (req, res, next) => {
	try {
		const { title, content, tags, image, published } = req.body;
		const post = await Blog.findById(req.params.id);
		if (!post) {
			res.status(404);
			throw new Error('Post not found');
		}

		post.title = title ?? post.title;
		post.content = content ?? post.content;
		post.tags = tags ?? post.tags;
		post.image = image ?? post.image;
		post.published = published ?? post.published;

		const updated = await post.save();
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Admin
export const deletePost = async (req, res, next) => {
	try {
		const post = await Blog.findById(req.params.id);
		if (!post) {
			res.status(404);
			throw new Error('Post Not Found');
		}
		await post.deleteOne();
		res.json({ message: 'Post Deleted' });
	} catch (error) {
		next(error);
	}
};
