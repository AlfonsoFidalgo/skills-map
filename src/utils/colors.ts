/**
 * Color system for Skills Map application
 *
 * Primary: Blue - Main brand color for navigation, primary actions, and key UI elements
 * Success: Green - Endorsements, success states, and positive feedback
 * Neutral: Gray - Secondary actions, disabled states, and neutral elements
 * Error: Red - Errors, warnings, and destructive actions
 */

export const colors = {
  // Primary Brand Colors (Blue)
  primary: {
    50: "bg-blue-50",
    100: "bg-blue-100",
    200: "bg-blue-200",
    500: "bg-blue-500",
    600: "bg-blue-600",
    700: "bg-blue-700",
    800: "bg-blue-800",
    900: "bg-blue-900",
  },

  // Success/Endorsement Colors (Green)
  success: {
    50: "bg-green-50",
    100: "bg-green-100",
    200: "bg-green-200",
    500: "bg-green-500",
    600: "bg-green-600",
    700: "bg-green-700",
    800: "bg-green-800",
  },

  // Neutral Colors (Gray)
  neutral: {
    50: "bg-gray-50",
    100: "bg-gray-100",
    200: "bg-gray-200",
    300: "bg-gray-300",
    400: "bg-gray-400",
    500: "bg-gray-500",
    600: "bg-gray-600",
    700: "bg-gray-700",
    800: "bg-gray-800",
    900: "bg-gray-900",
  },

  // Error Colors (Red)
  error: {
    50: "bg-red-50",
    100: "bg-red-100",
    200: "bg-red-200",
    500: "bg-red-500",
    600: "bg-red-600",
    700: "bg-red-700",
  },
} as const;

// Text color variants
export const textColors = {
  primary: {
    600: "text-blue-600",
    700: "text-blue-700",
    800: "text-blue-800",
    900: "text-blue-900",
  },
  success: {
    600: "text-green-600",
    700: "text-green-700",
    800: "text-green-800",
  },
  neutral: {
    400: "text-gray-400",
    500: "text-gray-500",
    600: "text-gray-600",
    700: "text-gray-700",
    800: "text-gray-800",
    900: "text-gray-900",
  },
  error: {
    500: "text-red-500",
    600: "text-red-600",
    700: "text-red-700",
  },
} as const;

// Border color variants
export const borderColors = {
  primary: {
    200: "border-blue-200",
    300: "border-blue-300",
    500: "border-blue-500",
  },
  success: {
    200: "border-green-200",
    300: "border-green-300",
  },
  neutral: {
    100: "border-gray-100",
    200: "border-gray-200",
    300: "border-gray-300",
  },
  error: {
    200: "border-red-200",
    300: "border-red-300",
  },
} as const;
