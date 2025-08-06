import { FaLinkedin } from "react-icons/fa";
export default function LinkedInButton() {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg flex items-center justify-center gap-3"
    >
      <FaLinkedin className="w-5 h-5" />
      Sign In with LinkedIn
    </button>
  );
}
