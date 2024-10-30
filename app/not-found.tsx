// app/not-found.js
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-5xl font-extrabold mb-4 text-red-500">404</h1>
        <p className="text-2xl mb-4">Page Not Found</p>
        <p className="text-center max-w-md mb-8">
          Sorry, the page you are looking for does not exist. It might have been removed or renamed.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go back home
        </a>
      </div>
    );
  }
  