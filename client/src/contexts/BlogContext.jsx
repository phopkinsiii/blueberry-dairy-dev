// src/contexts/BlogContext.jsx
/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
import React, { createContext, useReducer, useContext, useCallback } from 'react';
import axiosInstance from '../api/axios';

const initialBlogState = {
  posts: [],
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
      case 'SET_SINGLE_POST':
	return { ...state, singlePost: action.payload, loading: false };

    default:
      return state;
  }
};

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialBlogState);

  const fetchPosts = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axiosInstance.get('/blog');
      // Extract posts from the paginated response
      const posts = response.data?.posts || [];
      dispatch({ type: 'SET_POSTS', payload: posts });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch blog posts',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const deletePost = useCallback(async (postId, token) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      await axiosInstance.delete(`/blog/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: 'DELETE_POST', payload: postId });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to delete post',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchPostById = useCallback(async (id) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		const res = await axiosInstance.get(`/blog/${id}`);
		dispatch({ type: 'SET_SINGLE_POST', payload: res.data });
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Failed to fetch blog post',
		});
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false });
	}
}, []);


  return (
    <BlogContext.Provider value={{ state, dispatch, fetchPosts, deletePost, fetchPostById }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
