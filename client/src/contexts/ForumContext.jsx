/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
// src/contexts/ForumContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { forumReducer } from '../reducers/forumReducer.js';

import {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
	createReply,
	deleteReply,
} from '../services/forumService';

const ForumContext = createContext();

const initialState = {
	posts: [],
	loading: false,
	error: null,
};

export const ForumProvider = ({ children }) => {
	const [state, dispatch] = useReducer(forumReducer, initialState);

	const fetchPosts = async () => {
        console.log('📥 Fetching forum posts...');
		dispatch({ type: 'FORUM_LOADING' });
		try {
			const data = await getAllPosts();
			dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });
		} catch (error) {
            		console.error('❌ Fetch forum posts failed:', error.message);
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	const addPost = async (post) => {
		try {
			const data = await createPost(post);
			dispatch({ type: 'ADD_POST_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	const editPost = async (id, updatedPost) => {
		try {
			const data = await updatePost(id, updatedPost);
			dispatch({ type: 'UPDATE_POST_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	const removePost = async (id) => {
		try {
			await deletePost(id);
			dispatch({ type: 'DELETE_POST_SUCCESS', payload: id });
		} catch (error) {
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	const addReply = async (postId, reply) => {
		try {
			const updatedPost = await createReply(postId, reply);
			dispatch({ type: 'UPDATE_POST_SUCCESS', payload: updatedPost });
		} catch (error) {
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	const removeReply = async (postId, replyId) => {
		try {
			const updatedPost = await deleteReply(postId, replyId);
			dispatch({ type: 'UPDATE_POST_SUCCESS', payload: updatedPost });
		} catch (error) {
			dispatch({ type: 'FORUM_ERROR', payload: error.message });
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<ForumContext.Provider
			value={{
				...state,
				fetchPosts,
				addPost,
				editPost,
				removePost,
				addReply,
				removeReply,
			}}
		>
			{children}
		</ForumContext.Provider>
	);
};

export const useForumContext = () => useContext(ForumContext);
