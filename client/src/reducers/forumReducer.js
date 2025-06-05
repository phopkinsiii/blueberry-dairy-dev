// src/reducers/forumReducer.js

export const initialForumState = {
	posts: [],
	loading: false,
	error: null,
};

export const forumReducer = (state, action) => {
	switch (action.type) {
		case 'FORUM_LOADING':
			return { ...state, loading: true, error: null };

		case 'FETCH_POSTS_SUCCESS':
			return { ...state, loading: false, posts: action.payload };

		case 'FORUM_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'ADD_POST':
			return {
				...state,
				loading: false,
				posts: [action.payload, ...state.posts],
			};

		case 'UPDATE_POST':
			return {
				...state,
				loading: false,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};

		case 'DELETE_POST':
			return {
				...state,
				loading: false,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};

		case 'ADD_REPLY':
			return {
				...state,
				loading: false,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								replies: [...post.replies, action.payload.reply],
						  }
						: post
				),
			};

		default:
			return state;
	}
};
