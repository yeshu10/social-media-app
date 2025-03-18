
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token })); // Update Redux state
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Login</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg">{error}</div>}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//         const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
//       localStorage.setItem('token', res.data.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
//         <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Login</h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg border border-red-200">
//             {error}
//           </div>
//         )}

//         {/* Email Field */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-8">
//           <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Login
//         </button>

//         {/* Link to Register Page */}
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;