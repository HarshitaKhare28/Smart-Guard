import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    if (email == adminEmail && password == adminPassword) {
      alert("Login Successful");
      navigate("/home");
    } else {
      setError('Invalid email or password. Please try again.');
    }
    
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('images/bg11.png')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="p-8 rounded-lg shadow-md max-w-sm"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black with opacity
          backdropFilter: 'blur(10px)', // Glass effect with blur
          border: '1px solid rgba(255, 255, 255, 0.3)', // Light border for glassy effect
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">LOGIN</h2>
        <p className="text-center text-gray-300 mb-4">
          Welcome back! Please enter your details below to continue.
        </p>
        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full text-white bg-customGrey1 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full text-white bg-customGrey1 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm text-gray-100">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 focus:ring-indigo-500 border-gray-600 rounded"
                />
                <span className="ml-2">Remember Me</span>
              </label>
              
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
