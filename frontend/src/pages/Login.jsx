
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
    
    <div className="h-screen flex items-center justify-center ">
      
      <div className = "absolute inset-0 bg-black opacity-50"></div>
      <div className = "absolute inset-0 bg-white opacity-15"></div>
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 px-4">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="py-2 px-4 text-white font-semibold text-2xl ml-20"
        >
          HOME
        </button>
        <h1 className=" text-7xl text-customYellow font-playfair font-bold ml-20">SMART GUARD</h1>
        <button
          type="button"
          onClick={() => navigate('/contactUs')}
          className="py-2 px-4 text-white font-semibold text-2xl mr-20"
        >
          CONTACT US
        </button>
      </div>
      <div className='flex flex-row items-center justify-center w-full h-[500px] z-10 gap-x-1 gap-y-0 mt-20 mx-auto'>
        <div className='w-full max-w-xs'></div>
        <div className="bg-customGrey p-8 rounded-lg shadow-md w-full max-w-sm h-auto max-h-sm z-10 ml-20" style={{ boxSizing: 'border-box' }}> {/* Increased width and decreased padding */}
          <h2 className="text-2xl font-bold mb-4 text-center text-customYellow">LOGIN</h2> {/* Adjusted text size */}
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
                  className="mt-1 block w-full text-white bg-customGrey1 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
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
                  className="mt-1 block w-full text-white bg-customGrey1 px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center text-sm text-gray-100">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                    />
                    <span className="ml-2">Remember Me</span>
                  </label>
                  <a href="#" className="text-sm text-white hover:text-customBlue">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-customBlue text-white font-semibold rounded-md shadow-sm hover:bg-customBlue focus:outline-none focus:ring-2 focus:ring-cutomBlue focus:ring-offset-2 mb-4" >Login</button>
              <button
                type="button"
                onClick={() => navigate('/Signup')}
                className="w-full py-2 px-4 text-white font-semibold rounded-md border-4 border-customBlue shadow-sm hover:bg-customGrey1 focus:outline-none focus:ring-2 focus:ring-customGrey1 focus:ring-offset-2 mb-4" >Sign Up</button>

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
          <div className='hidden md:block w-1/3 h-auto max-h-[100vh] overflow-hidden flex-shrink-0 p-2 p-x-4 ml-20 mt-30 '>
            <img
              src="images/guard.png"
              alt="guard"
              className="w-full h-auto object-contain"
              style={{ maxWidth: '40%', maxHeight: '40%' }} 
            />
          </div>
        </div>
        
    </div>
  );
};
