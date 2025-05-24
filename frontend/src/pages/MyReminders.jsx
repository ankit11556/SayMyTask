import { useEffect, useState, useRef } from "react";
import { deleteReminder, getReminder } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { translateText } from "../services/translateText";

const MyReminders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [notifieldIds, setNotifieldIds] = useState(new Set());
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [translatedMessage, setTranslatedMessage] = useState("");

  const voicesRef = useRef([]);
  const currentReminderRef = useRef(null);
  const intervalRef = useRef(null);
  const isSpeakingRef = useRef(false);  // <-- Added to hold mutable speaking state

  // Load voices once
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesRef.current = voices;
      }
    };

    if ("speechSynthesis" in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Fetch reminders once
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getReminder();
        setReminders(response.data);
      } catch (error) {
        console.log(error.response?.data?.error);
      }
    };
    fetch();
  }, []);

 const getVoice = () => {
  const voices = voicesRef.current;
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));

  if (user.language === "hindi") {
    const hiVoice = voices.find(
      (v) => v.lang === "hi-IN" || v.lang.toLowerCase().includes("hi")
    );
    console.log("Selected Hindi voice:", hiVoice);
    if (hiVoice) return hiVoice;
  }

  const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  return enVoice || voices[0];
};


  const speakLoop = async (task, reminderId) => {
  if (currentReminderRef.current === reminderId) return;

  const englishSentence = `${user.name}, it's time to ${task}.`;

  // 👇 Translate based on user.language
  let finalMessage = englishSentence;

  if (user.language !== "english") {
    console.log("language",user.langMap);
    
    const langMap = {
      hindi: "hi",
      bengali: "bn",
      marathi: "mr",
      tamil: "ta",
      telugu: "te",
      gujarati: "gu"
    };
    const targetLang = langMap[user.language.toLowerCase()] || "en";

    try {
      finalMessage = await translateText(englishSentence, targetLang);
      console.log("Translated message:", finalMessage);
    } catch (err) {
      console.error("Translation failed. Using English fallback.");
      finalMessage = englishSentence;
    }
  }

  setTranslatedMessage(finalMessage); // 👈 This makes it available in JSX

  currentReminderRef.current = reminderId;
  setCurrentTask(task);
  setShowStopPopup(true);

  isSpeakingRef.current = true;
  setIsSpeaking(true);

  const voice = getVoice();

  const utterance = new SpeechSynthesisUtterance(finalMessage);
  // console.log("Final message to speak:", finalMessage);
  utterance.voice = voice;
  utterance.lang = voice?.lang || "en-US";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  utterance.onend = () => {
    if (isSpeakingRef.current && currentReminderRef.current === reminderId) {
      setTimeout(() => {
        if (isSpeakingRef.current && currentReminderRef.current === reminderId) {
          window.speechSynthesis.speak(utterance);
        }
      }, 1000);
    }
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};



  const stopSpeaking = () => {
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    window.speechSynthesis.cancel();

    if (currentReminderRef.current) {
      setNotifieldIds((prev) => {
        const updated = new Set(prev);
        updated.add(currentReminderRef.current);
        return updated;
      });
    }

    currentReminderRef.current = null;
    setShowStopPopup(false);
    setCurrentTask("");
  };

  // Check reminders every second
  useEffect(() => {
    if (!reminders.length) return;

    intervalRef.current = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.dateTime);
        const timeDiff = reminderTime - now;

        if (
          Math.abs(timeDiff) <= 2000 && // 2 second tolerance
          reminderTime <= now &&
          !notifieldIds.has(reminder._id)
        ) {
          speakLoop(reminder.tasks, reminder._id);
          setNotifieldIds((prev) => {
            const updated = new Set(prev);
            updated.add(reminder._id);
            return updated;
          });
        }
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [reminders, notifieldIds]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteReminder(id);
      alert(response.data.message);
      const updatedReminders = reminders.filter((r) => r._id !== id);
      setReminders(updatedReminders);
      setNotifieldIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

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
              <div className="flex space-x-3 mt-3">
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

      {showStopPopup && (
  <div
    className="fixed bottom-5 right-5 bg-white border border-gray-300 shadow-lg rounded p-4 flex items-center space-x-4 z-50"
    style={{ minWidth: "280px" }}
  >
    <p className="font-medium text-gray-800">
      {user.language === "english"
        ? `${user.name}, Reminder: "it's time to ${currentTask}." `
        : `${user.name}, Reminder: "${translatedMessage}"`}
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
