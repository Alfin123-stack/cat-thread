// components/ErrorPage.js
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-100 px-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-300 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      {error?.statusText || error?.message ? (
        <p className="text-sm text-red-400 italic">
          {error.statusText || error.message}
        </p>
      ) : null}
    </div>
  );
}

export default ErrorPage;
