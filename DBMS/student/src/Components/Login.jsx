import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const url = isRegister
        ? "http://localhost:2001/api/users"
        : "http://localhost:2001/api/users/login";

      const res = await axios.post(url, formData);

      if (isRegister) {
        setMessage("🎉 Registration successful!");
        setIsRegister(false)
        navigate("/login")
      }
      
      if (res.data.token) {
        setMessage( "✅ Login successful!");
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || "⚠️ Something went wrong.");
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };
  if (isRedirecting) {
    return <LoadingScreen />;
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <motion.div 
          className="w-full max-w-md"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl dark:bg-gray-800/90 dark:border-gray-700 overflow-hidden">
            <div className="p-8 space-y-6">
              <motion.h2 
                className="text-2xl font-bold text-center text-gray-900 dark:text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isRegister ? "Create an Account" : "Welcome Back!"}
              </motion.h2>
              
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {isRegister ? "Sign up to get started 🚀" : "Login to continue 🔐"}
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              {message && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg"
                >
                  <p className="text-green-600 dark:text-green-400 text-sm text-center">{message}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
                                 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200 ease-in-out
                                 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        placeholder="John Doe"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
                                 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200 ease-in-out
                                 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
                             bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 ease-in-out
                             dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
                             bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 ease-in-out
                             dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                           text-white py-3 rounded-lg transition-all duration-200 font-semibold
                           shadow-lg hover:shadow-xl"
                >
                  {isRegister ? "Sign Up" : "Login"}
                </motion.button>
              </form>
            </div>

            <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  className="text-blue-600 font-semibold hover:text-blue-700 dark:text-blue-400 
                           dark:hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Login here" : "Register here"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
