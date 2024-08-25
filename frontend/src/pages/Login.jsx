export const Login = () => {
    return (
      <div className="flex h-screen">
        {/* Left side with the image and text */}
        <div className="relative w-1/2 flex flex-col justify-center p-8 bg-black bg-opacity-60 text-white">
          <div className="text-center mb-8">
            <div className="text-2xl mb-4">Logo app ka</div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Smart Guard</h1>
            <img src="/path-to-your-vector-image.png" alt="Welcome" className="w-3/4 h-auto mx-auto" />
          </div>
          <p className="text-sm text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {"industry's"} standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but...
          </p>
        </div>
        
        {/* Right side with the login form */}
        <div className="relative w-1/2 flex flex-col justify-center p-8 bg-black bg-opacity-60 text-white border-l-4 border-white">
          <h2 className="text-xl mb-6 text-center">smart Guard ke upar tagline</h2>
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="enter email" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <input 
              type="password" 
              placeholder="enter password" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <div className="flex justify-between items-center text-sm text-gray-300">
              <label className="flex items-center text-gray-200">
                <input type="checkbox" className="mr-2" />
                Remember me?
              </label>
              <a href="#" className="hover:underline text-gray-200">Forgot Password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-transparent border-2 border-white bg-white text-slate-950 hover: hover:bg-gray-100 rounded-lg font-semibold"
            >
              Login
            </button>
            <button 
              type="button" 
              className="w-full py-3 border-2 border-white text-white hover:bg-gray-700 rounded-lg font-semibold mt-4"
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center justify-center w-full mt-8">
            <hr className="w-1/3 border-gray-600" />
            <span className="mx-4 text-gray-300">Or</span>
            <hr className="w-1/3 border-gray-600" />
          </div>
          <button 
            type="button" 
            className="w-full py-3 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 rounded-lg mt-4"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Icon" className="mr-2" />
            Log in with Google
          </button>
        </div>
      </div>
    );
  };
  