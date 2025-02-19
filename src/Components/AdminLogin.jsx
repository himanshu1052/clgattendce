import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast'; // Import hot-toast

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!credentials.email || !credentials.password) {
      // If not, show a warning toast with a timeout
      toast.error('Please fill in both fields!', {
        duration: 4000, // Duration in ms (default: 5000ms)
      });
      return;
    }

    // Demo login logic (replace with real authentication)
    if (credentials.email === 'admin@its.edu.in' && credentials.password === 'admin123') {
      // Set the auth token (simulating successful login)
      localStorage.setItem('isLoggedIn', 'true');

      // Show success toast with a timeout before navigating
      toast.success('Login successful!', {
        duration: 4000, // Duration in ms (default: 5000ms)
      });

      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 4000); // Match the duration of the toast to delay navigation
    } else {
      // Show error toast if login fails
      toast.error('Invalid credentials', {
        duration: 4000, // Duration in ms
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>
        <p className="mt-2 text-center text-gray-600">Enter your credentials to access the dashboard</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                  placeholder="admin@its.edu.in"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
