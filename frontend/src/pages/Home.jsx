import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, editPost } from '../features/posts/postSlice';
import CreatePost from '../components/CreatePost';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleEditPost = (postId, updatedContent) => {
    dispatch(editPost({ postId, content: updatedContent }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Social Media App</h1>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <CreatePost />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Feed</h2>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-600">{error}</p>}
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.user?.username?.charAt(0) || 'U'}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{post.user?.username || 'Unknown User'}</h3>
                <p className="text-sm text-gray-500">{new Date(post.date).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.image && (
              <img
                src={`${import.meta.env.VITE_API_URL}/${post.image}`} // Construct the full image URL
                alt="Post"
                className="mb-4 rounded-lg w-full max-w-md"
              />
            )}
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-blue-600 transition duration-200">Like</button>
              <button className="text-gray-500 hover:text-blue-600 transition duration-200">Comment</button>
              <button className="text-gray-500 hover:text-blue-600 transition duration-200">Share</button>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="text-red-500 hover:text-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const updatedContent = prompt('Edit your post:', post.content);
                  if (updatedContent) handleEditPost(post._id, updatedContent);
                }}
                className="text-blue-500 hover:text-blue-600 transition duration-200"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts, deletePost, editPost } from '../features/posts/postSlice';
// import CreatePost from '../components/CreatePost';
// import { logout } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { posts, status, error } = useSelector((state) => state.posts);

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   const handleDeletePost = (postId) => {
//     dispatch(deletePost(postId));
//   };

//   const handleEditPost = (postId, updatedContent) => {
//     dispatch(editPost({ postId, content: updatedContent }));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
//       <nav className="bg-white shadow-lg p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">Social Media App</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <div className="container mx-auto p-6">
//         <CreatePost />
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Feed</h2>
//         {status === 'loading' && <p>Loading...</p>}
//         {status === 'failed' && <p className="text-red-600">{error}</p>}
//         {posts.map((post) => (
//           <div key={post._id} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
//             <div className="flex items-center mb-4">
//               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                 {post.user?.username?.charAt(0) || 'U'}
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-semibold text-gray-800">{post.user?.username || 'Unknown User'}</h3>
//                 <p className="text-sm text-gray-500">{new Date(post.date).toLocaleString()}</p>
//               </div>
//             </div>
//             <p className="text-gray-700 mb-4">{post.content}</p>
//             {post.image && <img src={post.image} alt="Post" className="mb-4 rounded-lg" />}
//             <div className="flex space-x-4">
//               <button className="text-gray-500 hover:text-blue-600 transition duration-200">Like</button>
//               <button className="text-gray-500 hover:text-blue-600 transition duration-200">Comment</button>
//               <button className="text-gray-500 hover:text-blue-600 transition duration-200">Share</button>
//               <button
//                 onClick={() => handleDeletePost(post._id)}
//                 className="text-red-500 hover:text-red-600 transition duration-200"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => {
//                   const updatedContent = prompt('Edit your post:', post.content);
//                   if (updatedContent) handleEditPost(post._id, updatedContent);
//                 }}
//                 className="text-blue-500 hover:text-blue-600 transition duration-200"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
