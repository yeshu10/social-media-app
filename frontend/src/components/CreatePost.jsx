import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postSlice';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // For file upload
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content) {
      setError('Please enter some content.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile); // Append the image file
      }

      await dispatch(createPost(formData)).unwrap(); // Dispatch createPost action
      setContent('');
      setImageFile(null);
    } catch (err) {
      setError(err.message || 'Failed to create post');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create a Post</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Content Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">What's on your mind?</label>
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;