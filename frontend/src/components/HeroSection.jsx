import { Link } from "react-router-dom";

const HeroSection = ({ onDemoClick }) => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10 px-4 text-center rounded-lg shadow-lg m-2">
      <h2 className="text-4xl md:text-5xl font-extrabold font-[Poppins] mb-4 leading-tight">
        🔊 Welcome to <span className="text-[#F472B6]">SayMyTask</span>
      </h2>
      <p className="text-lg md:text-xl font-medium mb-3 max-w-2xl mx-auto font-[Poppins]">
       Smart voice reminders that call your name – simple, personal & effective!
      </p>
      <p className="text-md md:text-lg mb-6 max-w-xl mx-auto font-[Poppins]">
        Stay on top of your tasks and make life easier with SayMyTask.
      </p>
      
      <Link
        to="/set-reminder"
        className="inline-block bg-[#f472b5] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform hover:bg-pink-500 transition-all duration-300"
      >
        Set a Reminder
      </Link>

      {/* Scroll to Voice Demo */}
      <button
       onClick={onDemoClick}
        className="mt-6 block mx-auto text-white underline hover:text-pink-200 font-[Poppins] hover:cursor-pointer"
      >
          Try a Demo Voice Reminder 
      </button>
    </section>
  );
};

export default HeroSection;
