function Spinner() {
  return (

    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center justify-center space-y-4">
      {/* Loading Spinner */}
      <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />

      {/* Loading Text */}
      <div className="text-center text-xl text-blue-400">
        <span className="animate-pulse">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
