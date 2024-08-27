import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg"> {/* Increased width and decreased padding */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Smart Guard Sign Up</h2> {/* Adjusted text size */}
        <p className="text-center text-gray-300 mb-4">
          Create an account to get started with Smart Guard.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="block text-sm font-medium text-gray-100">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full text-white bg-gray-700 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
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
              className="mt-1 block w-full text-white bg-gray-700 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-100">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full text-white bg-gray-700 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full text-white bg-gray-700 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4" >Sign Up</button>
          <button
            type="button"
            onClick={()=>navigate('/Login')}
            className="w-full py-2 px-4 text-white font-semibold rounded-md border-4 border-indigo-700 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mb-4" >Login</button>

          <div className="text-center mb-4">
            <span className="text-gray-300">or</span>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 text-gray-950 font-semibold rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center" ><img src="https://pngdow.com/files/preview/800x800/11722280805b4vi91domiophd87cjmnmwtjhyopqholatbnxkuahnxchtd6y9zusubuq8mgxlhi6kg2nmduczbhghtlyfrdsx0sitjn3ngget0q.png" className="h-6 mr-2"/>Sign Up with Google</button>
        </form>
      </div>
    </div>
  );
};
