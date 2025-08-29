import { useState, type FormEvent } from "react";
import { useLogin } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // State for the email and password form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the login action from our Zustand store
  const { login: loginUser } = useAuthStore();
  const navigate = useNavigate();

  // Get the mutation function and its state from our custom hook
  const { mutate: login, isPending, isError, error } = useLogin();

  // Check if form is valid
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // Function to handle the form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent the browser from refreshing the page

    login(
      { email, password },
      {
        onSuccess: (data) => {
          // On success, update the global state and redirect
          console.log("Login successful!", data);
          loginUser(data.user, data.token);
          navigate("/admin");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked - implement Google OAuth");
    // TODO: Implement Google OAuth
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook sign in clicked - implement Facebook OAuth");
    // TODO: Implement Facebook OAuth
  };

  const handleSignUpClick = () => {
    console.log("Navigate to register page");
    // Replace with your navigation logic: navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Inknut_Antiqua'] relative">
      {/* Background Image - Mobile Only */}
      <div className="absolute inset-0 md:hidden">
        <img src="/14.jpeg" alt="LinkBranch Nature Scene" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/20 to-black/50"></div>
      </div>

      {/* Logo and Tree Icon */}
      <div className="absolute top-6 md:top-12 left-6 md:left-12 flex items-center z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white md:text-gray-900">LinkBranch</h1>
        <img src="/logo.jpg" alt="LinkBranch Logo" className="ml-2 w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
      </div>

      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 bg-transparent md:bg-gray-50 flex flex-col justify-center px-6 sm:px-8 md:px-16 py-8 md:-mt-44 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Main Heading */}
          <div className="text-center mb-6 md:mb-8 mt-16 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white md:text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-200 md:text-gray-600">Log in to your LinkBranch</p>
          </div>

          {/* Login Form */}
          <div className="space-y-3">
            <div className="relative">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 md:border-gray-300 border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent peer bg-transparent md:bg-gray-100 focus:bg-white backdrop-blur-sm" placeholder=" " />
              <label htmlFor="email" className="absolute left-4 top-3 text-gray-200 md:text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                Email
              </label>
            </div>

            <div className="relative">
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 md:border-gray-300 border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent peer bg-transparent md:bg-gray-100 focus:bg-white backdrop-blur-sm" placeholder=" " />
              <label htmlFor="password" className="absolute left-4 top-3 text-gray-200 md:text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                Password
              </label>
            </div>

            {/* Login Button */}
            <button type="submit" onClick={handleSubmit} disabled={isPending || !isFormValid} className={`w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors ${isFormValid && !isPending ? "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500" : "bg-gray-400 text-gray-600 cursor-not-allowed"}`}>
              {isPending ? "Logging in..." : "Log In"}
            </button>

            {/* Error Message */}
            {isError && <p className="text-red-600 text-sm text-center">Error: {error?.message || "Login failed. Please try again."}</p>}

            {/* Divider */}
            <div className="text-center">
              <span className="text-gray-300 md:text-gray-500 text-2xl">or</span>
            </div>

            {/* Social Sign In Buttons */}
            <div className="space-y-3">
              <button type="button" onClick={handleGoogleSignIn} className="w-full bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <button type="button" onClick={handleFacebookSignIn} className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </button>
            </div>

            {/* Forgot Password Link */}

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-300 md:text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" onClick={handleSignUpClick} className="text-white md:text-gray-900 font-medium hover:underline focus:outline-none">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Desktop/Tablet Only) */}
      <div className="hidden md:block w-1/2 h-screen relative overflow-hidden">
        <img src="/14.jpeg" alt="LinkBranch Nature Scene" className="w-full h-full object-cover brightness-90" />
        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-black/30"></div>

        {/* Floating content */}
        <div className="absolute bottom-12 right-12 text-right text-white max-w-sm">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3 font-['Inknut_Antiqua'] drop-shadow-lg">Welcome Home</h3>
          <p className="text-base lg:text-lg opacity-90 font-light leading-relaxed drop-shadow-md">Your digital branches await</p>
          <div className="mt-4 w-16 h-0.5 bg-white/60 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
