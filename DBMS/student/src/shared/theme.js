// Shared theme configuration for consistent styling
export const theme = {
  colors: {
    primary: {
      light: '#60A5FA', // blue-400
      DEFAULT: '#2563EB', // blue-600
      dark: '#1D4ED8', // blue-700
    },
    secondary: {
      light: '#A855F7', // purple-500
      DEFAULT: '#7C3AED', // purple-600
      dark: '#6D28D9', // purple-700
    },
    success: {
      light: '#4ADE80', // green-400
      DEFAULT: '#22C55E', // green-500
      dark: '#16A34A', // green-600
    },
    warning: {
      light: '#FCD34D', // yellow-400
      DEFAULT: '#F59E0B', // yellow-500
      dark: '#D97706', // yellow-600
    },
    error: {
      light: '#F87171', // red-400
      DEFAULT: '#EF4444', // red-500
      dark: '#DC2626', // red-600
    },
  },
  spacing: {
    layout: {
      page: 'px-4 py-6 sm:px-6 lg:px-8',
      section: 'px-4 py-5 sm:p-6',
      card: 'p-4 sm:p-6',
    },
  },
  components: {
    card: 'bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700',
    button: {
      base: 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm',
      outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
    },
    input: 'w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
  },
  animation: {
    transition: 'transition-all duration-200 ease-in-out',
    hover: 'hover:scale-102 hover:shadow-lg',
  },
}; 