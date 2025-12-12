import { useRef } from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaMicrophone, FaGlobe, FaClock } from "react-icons/fa";

const Home = () => {
  const demoRef = useRef(null);

  const handleScrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection onDemoClick={handleScrollToDemo} />

      {/* Voice Demo Section */}
      <section
        className="bg-gray-100 py-16 px-6 text-center rounded-lg shadow-lg hover:shadow-xl transition-all"
        ref={demoRef}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-[Poppins]">
          🔊 Experience It Instantly
        </h2>
        <p className="text-gray-700 mb-6 text-lg font-[Poppins]">
          Hear how this app will remind <strong>you by name</strong> at the right time.
        </p>
        <button
          onClick={() => {
            const msg = new SpeechSynthesisUtterance(
              "Jony, it's time to study."
            );
            speechSynthesis.speak(msg);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
        >
          ▶️ Play Voice Demo
        </button>
        <p className="text-gray-500 mt-3 text-sm font-[Poppins]">
          Example: “Jony, it's time to study.”
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 font-[Poppins]">
          Why SayMyTask?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
            <FaMicrophone className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700 font-[Poppins]">
              Voice Reminders
            </h3>
            <p className="text-gray-700 font-[Poppins]">
              Personalized reminders that speak your name for better recall.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <FaGlobe className="text-4xl text-indigo-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700 font-[Poppins]">
              Multi-Language Support
            </h3>
            <p className="text-gray-700 font-[Poppins]">
              Supports multiple languages: English, Hindi, Tamil, Korean & Italian.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <FaClock className="text-4xl text-pink-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-pink-600 font-[Poppins]">
              One-Time or Scheduled
            </h3>
            <p className="text-gray-700 font-[Poppins]">
              Create once and forget – we remind you on time, every time.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works / Workflow */}
      <section id="workflow" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 font-[Poppins]">
          Getting Started
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold text-lg">
              1
            </div>
            <p className="font-[Poppins]">Sign Up or Log In</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold text-lg">
              2
            </div>
            <p className="font-[Poppins]">Set Your Task with Name & Time</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold text-lg">
              3
            </div>
            <p className="font-[Poppins]">Get Reminded by Voice at the Right Time</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 font-[Poppins]">
          What Users Say
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <p className="text-gray-700 font-[Poppins] mb-4">
              "SayMyTask helped me never miss my online classes! Personal reminders are amazing."
            </p>
            <h4 className="font-semibold text-gray-900">— John Doe</h4>
          </div>
          <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <p className="text-gray-700 font-[Poppins] mb-4">
              "I love that it reminds me by name. Super personal and effective!"
            </p>
            <h4 className="font-semibold text-gray-900">— Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 font-[Poppins]">Ready to get started?</h2>
        <p className="text-lg mb-6 font-[Poppins]">Create your first voice reminder now!</p>
        <Link
          to="/set-reminder"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Set a Reminder
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
