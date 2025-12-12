import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Typing animation component
const TypingText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const HeroSection = ({ onDemoClick }) => {
  return (
    <section className="bg-blue-500 text-white py-16 px-6 md:px-16 text-center rounded-lg shadow-lg m-2 backdrop-blur-xl border border-white/20 mt-10 relative overflow-hidden">
      {/* Optional floating shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold font-[Poppins] mb-4 leading-tight">
          🔊 Welcome to{" "}
          <span className="bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            SayMyTask
          </span>
        </h2>

        <p className="text-lg md:text-xl font-medium mb-3 max-w-2xl mx-auto font-[Poppins]">
          <TypingText text="Never miss a task again – Your personal voice assistant in your pocket." />
        </p>

        <p className="text-md md:text-lg mb-6 max-w-xl mx-auto font-[Poppins]">
          Stay on top of your tasks effortlessly – simple, personal & effective!
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <Link
            to="/set-reminder"
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(244,114,182,0.5)] transition-all duration-300"
          >
            Set a Reminder
          </Link>

          <button
            onClick={onDemoClick}
            className="flex items-center justify-center underline hover:text-pink-200 font-medium hover:translate-x-1 transition-all"
          >
            Try a Demo Voice Reminder →
            <span className="ml-2 animate-bounce">🎤</span>
          </button>
        </div>
      </div>

      {/* Optional right-side phone mockup */}
      {/* <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
        <img
          src="/mockup.png"
          alt="App Demo"
          className="w-64 md:w-80 shadow-xl rounded-xl"
        />
      </div> */}
    </section>
  );
};

export default HeroSection;
