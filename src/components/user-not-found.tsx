import Link from "next/link";
import { IoIosAlert } from "react-icons/io";

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <IoIosAlert className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          User Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The user you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
