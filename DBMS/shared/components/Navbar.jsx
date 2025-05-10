import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

export const Navbar = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Hostel Management"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Navigation Links */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="border-primary-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                href="/dashboard"
              >
                Dashboard
              </motion.a>
              {/* Add more nav links */}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={`${theme.components.button.primary} px-4 py-2`}
              >
                New Request
              </motion.button>
            </div>

            <div className="ml-4 relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex rounded-full bg-gray-100 dark:bg-gray-700 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.name}
                  />
                </button>
              </motion.div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                  >
                    <div className="rounded-md bg-white dark:bg-gray-800 shadow-xs">
                      <div className="py-1">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Your Profile
                        </a>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Settings
                        </a>
                        <button
                          onClick={onLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}; 