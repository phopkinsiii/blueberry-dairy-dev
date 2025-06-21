import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // no longer required
	content: { type: String, required: true },
	author: {
		name: { type: String, default: 'Anonymous' },
	},
	createdAt: { type: Date, default: Date.now },
});

const forumPostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // now optional
		author: {
			name: { type: String, default: 'Anonymous' },
		},
		replies: [replySchema],
	},
	{ timestamps: true }
);

export default mongoose.model('ForumPost', forumPostSchema);
