import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Social Media App</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Logout
          </button>
        </div>
      </nav>

      {/* Feed Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Feed</h2>

        {/* Post Card Example */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Username</h3>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            This is a sample post. You can share your thoughts, images, or videos here!
          </p>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-blue-600 transition duration-200">
              Like
            </button>
            <button className="text-gray-500 hover:text-blue-600 transition duration-200">
              Comment
            </button>
            <button className="text-gray-500 hover:text-blue-600 transition duration-200">
              Share
            </button>
          </div>
        </div>

        {/* Add more posts here */}
      </div>
    </div>
  );
};

export default Home;