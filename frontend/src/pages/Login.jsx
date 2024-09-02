
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission
  console.log('Email:', email);
  console.log('Password:', password);
};

return (
  <div className="h-screen flex items-center justify-center">
    <div className="bg-customGrey p-8 rounded-lg shadow-md  max-w-md"> {/* Increased width and decreased padding */}
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-100"> LOGIN</h2> {/* Adjusted text size */}
      <p className="text-center text-gray-300 mb-4">
        Welcome back! Please enter your details below to continue.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">
            Email
          </label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
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
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot Password?
              </a>
            </div>
            </div>
            <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4" >Login</button>
          <button
            type="button"
            onClick={() => navigate('/Signup')}
            className="w-full py-2 px-4 text-white font-semibold rounded-md border-4 border-blue-700 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mb-4" >Sign Up</button>

          <div className="text-center mb-4">
            <span className="text-gray-300">or</span>
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 text-gray-950 font-semibold rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center" ><img src="https://pngdow.com/files/preview/800x800/11722280805b4vi91domiophd87cjmnmwtjhyopqholatbnxkuahnxchtd6y9zusubuq8mgxlhi6kg2nmduczbhghtlyfrdsx0sitjn3ngget0q.png"className="h-6 mr-2" />
            Login with Google
            </button>
            </form>
      </div>
      </div>
  );
};