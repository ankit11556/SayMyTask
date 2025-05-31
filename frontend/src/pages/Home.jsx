import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 font-[Poppins]">Why SayMyTask?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2 text-blue-700 font-[Poppins]">Voice Reminders</h3>
            <p className="text-gray-700 font-[Poppins]">Get reminded in your own voice. More personal, more effective!</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
           <h3 className="text-xl font-semibold mb-2 text-indigo-700 font-[Poppins]">Language Support</h3>
           <p className="text-gray-700 font-[Poppins]">
            Currently, reminders are supported only in English.<br />
            Multi-language support coming soon!
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2 text-pink-600 font-[Poppins]">One-Time or Scheduled</h3>
            <p className="text-gray-700 font-[Poppins]">Create once and forget – we remind you on time, every time.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 font-[Poppins]">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">1</div>
            <p className="font-[Poppins]">Sign Up or Log In</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">2</div>
            <p className="font-[Poppins]">Set Your Reminder & Record Voice</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">3</div>
            <p className="font-[Poppins]">Get Notified on Time!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 font-[Poppins]">Ready to get started?</h2>
        <p className="text-lg mb-6 font-[Poppins]">Create your first voice reminder now!</p>
        <Link
          to="/set-reminder"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
        >
          Set a Reminder
        </Link>
      </section>
    </>
  );
};

export default Home;
