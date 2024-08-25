export const Signup = () => {
    return (
      <div className="flex h-screen">
        <div className="relative w-1/2 flex flex-col justify-center p-8 bg-black bg-opacity-60 text-white">
          {/* Left side with the image and text */}
          <div className="text-center mb-8">
            <div className="text-2xl mb-4">Logo app ka</div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Smart Guard</h1>
            <img src="/path-to-your-vector-image.png" alt="Welcome" className="w-3/4 h-auto mx-auto" />
          </div>
          <p className="text-sm text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {"industry's"} standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but...
          </p>
        </div>
        
        <div className="relative w-1/2 flex flex-col justify-center p-8 bg-black bg-opacity-60 text-white border-l-4 border-white">
          {/* Right side with the signup form */}
          <h2 className="text-xl mb-6 text-center">smart Guard ke upar tagline</h2>
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="enter username" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <input 
              type="email" 
              placeholder="enter email" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <input 
              type="tel" 
              placeholder="enter phone" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
            <input 
              type="password" 
              placeholder="enter password" 
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
            />
  
            <button 
              type="submit" 
              className="w-full py-3 bg-transparent border-2 bg-white  text-slate-950 hover: hover:bg-gray-100  rounded-lg font-semibold"
            >
              Sign Up
            </button>
            <button 
              type="button" 
              className="w-full py-3 border-2 border-white text-white hover:bg-gray-700 rounded-lg font-semibold mt-4"
            >
              Login
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
            Sign up with Google
          </button>
        </div>
      </div>
    );
  };
  