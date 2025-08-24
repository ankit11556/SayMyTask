const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Logo + App Name */}
      <h1 className="text-4xl md:text-5xl font-extrabold font-[Poppins] mb-6 flex items-center space-x-3">
        <img src="../assets/logo.png" alt="SayMyTask logo" className="w-10 h-10" />
        <span>SayMyTask</span>
      </h1>

      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold font-[Poppins]">Loading your tasks...</p>
    </div>
  );
};

export default LoadingPage;
