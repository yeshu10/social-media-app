import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

// Create post
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

// Delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return postId;
});

// Edit post
export const editPost = createAsyncThunk('posts/editPost', async ({ postId, content }) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); // Add new post to the top
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload); // Remove deleted post
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload; // Update post
        }
      });
  },
});

export default postSlice.reducer;