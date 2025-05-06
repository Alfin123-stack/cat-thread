import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-100 px-6">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        The page you're looking for doesn't seem to exist or may have been
        moved.
      </p>
      <Button to="/">Back to Home</Button>
    </div>
  );
}

export default NotFoundPage;
