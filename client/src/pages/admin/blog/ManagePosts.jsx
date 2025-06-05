// src/pages/admin/ManagePosts.jsx
// @ts-nocheck
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../../contexts/BlogContext';
import { useUserContext } from '../../../contexts/UserContext';

const ManagePosts = () => {
  const { state, fetchPosts, deletePost } = useBlogContext();
  const { state: userState } = useUserContext();
  const navigate = useNavigate();
  const { posts, loading, error } = state;
  const user = userState.user;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id, user?.token);
    }
  };

const handleEdit = (id) => {
  navigate(`/admin/edit-blog/${id}`);
};


  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>Manage Blog Posts</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='grid gap-6'>
        {posts.map((post) => (
          <div key={post._id} className='p-4 border rounded shadow-sm bg-white'>
            <h3 className='text-xl font-semibold text-gray-800 mb-1'>{post.title}</h3>
            <p className='text-gray-600 text-sm mb-2'>
              {new Date(post.createdAt).toLocaleDateString()} | {post.tags?.join(', ') || 'General'}
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => handleEdit(post._id)}
                className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
