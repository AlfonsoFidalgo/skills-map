import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { auth } from "@/auth";
import { OpenModalProvider } from "@/contexts/open-modal-context";

type Params = Promise<{ userId: string }>;

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { userId: pageUserId } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span className="font-bold text-lg">Skills Map</span>
            </Link>

            {currentUserId !== pageUserId && currentUserId && (
              <Link
                href={`/user/${currentUserId}`}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FaRegUser className="w-5 h-5" />
                <span>My Profile</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <OpenModalProvider>{children}</OpenModalProvider>
      </div>
    </div>
  );
}
