import { useEffect, useState, useRef } from "react";
import { deleteReminder, getReminder } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyReminders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [notifieldIds, setNotfieldIds] = useState(new Set());
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const utteranceRef = useRef(null); // For speechSynthesis utterance

  // Fetch reminders from API
  const fetch = async () => {
    try {
      const response = await getReminder();
      setReminders(response.data);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // Speak reminder based on language using speechSynthesis only
  const speakReminder = (task) => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support Text to Speech.");
      return;
    }

    // Cancel ongoing speech before starting new
    window.speechSynthesis.cancel();

    // Build message
    const message =
      user.language === "hindi"
        ? `${user.name} जी, ${task} करने का समय हो गया है।`
        : `${user.name}, it's time to ${task}.`;

    const utterance = new SpeechSynthesisUtterance(message);

    // Adjust voice rate and pitch for clarity
    utterance.rate = 0.8;
    utterance.pitch = 1;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Select voice based on language preference
    let selectedVoice = null;
    if (user.language === "hindi") {
      selectedVoice = voices.find((v) => v.lang.startsWith("hi"));
    }
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.lang.startsWith("en"));
    }
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0]; // fallback voice
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      // fallback language code
      utterance.lang = user.language === "hindi" ? "hi-IN" : "en-US";
    }

    utterance.onend = () => {
      setShowStopPopup(false);
      setCurrentTask("");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    setShowStopPopup(true);
    setCurrentTask(message);
  };

  // Stop speaking / playing audio
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setShowStopPopup(false);
    setCurrentTask("");
  };

  // Reminder check interval - every 5 seconds check if any reminder is due
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.dateTime);

        if (reminderTime <= now && !notifieldIds.has(reminder._id)) {
          speakReminder(reminder.tasks);
          setNotfieldIds((prev) => new Set(prev).add(reminder._id));
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [reminders, notifieldIds]);

  // Delete reminder handler
  const handleDelete = async (id) => {
    try {
      const response = await deleteReminder(id);
      alert(response.data.message);
      const updatedReminders = reminders.filter(
        (reminder) => reminder._id !== id
      );
      setReminders(updatedReminders);

      setNotfieldIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // Load voices on mount to avoid delayed voice list loading
  useEffect(() => {
    if ("speechSynthesis" in window) {
      // Force load voices
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">My Reminders</h2>

      {reminders.length === 0 ? (
        <p className="text-gray-600">No reminders found.</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((reminder, index) => (
            <li
              key={index}
              className="bg-white shadow-md p-4 rounded border border-blue-100"
            >
              <p className="text-blue-700 font-semibold">{reminder.tasks}</p>
              <p className="text-gray-500 text-sm">
                {new Date(reminder.dateTime).toLocaleString()}
              </p>
              <div className="flex space-x-3 mt-3 ">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(reminder._id)}
                >
                  Delete
                </button>

                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() =>
                    navigate("/set-reminder", { state: { reminders: reminder } })
                  }
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Stop popup */}
      {showStopPopup && (
        <div
          className="fixed bottom-5 right-5 bg-white border border-gray-300 shadow-lg rounded p-4 flex items-center space-x-4 z-50"
          style={{ minWidth: "280px" }}
        >
          <p className="font-medium">
            {user.language === "hindi"
              ? `${user.name}, आपकी याददाश्त: "${currentTask}" पूरा हो गया है।`
              : `${user.name}, Reminder: "${currentTask}" is running.`}
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={stopSpeaking}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default MyReminders;
