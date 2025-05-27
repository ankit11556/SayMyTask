import { useEffect, useState, useRef } from "react";
import { deleteReminder, getReminder } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyReminders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [notifieldIds, setNotifieldIds] = useState(new Set());
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
 
  const voicesRef = useRef([]);
  const currentReminderRef = useRef(null);
  const intervalRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Load available voices for speech synthesis
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

  // Fetch reminders from API once on mount
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

  // Get English voice or fallback to first voice
  const getVoice = () => {
    const voices = voicesRef.current;
    const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    return enVoice || voices[0];
  };

  // Speech speak loop for reminder tasks
  const speakLoop = (task, reminderId) => {
    if (currentReminderRef.current === reminderId) return; // Prevent multiple speaking at same time

    const finalMessage = `${user.name}, it's time to ${task}.`;
    currentReminderRef.current = reminderId;
    setCurrentTask(task);
    setShowStopPopup(true);


    isSpeakingRef.current = true;
    setIsSpeaking(true);

    const voice = getVoice();

    const utterance = new SpeechSynthesisUtterance(finalMessage);
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

  // Stop the speech reminder
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

  // Interval check every second for scheduled reminders
  useEffect(() => {
    if (!reminders.length) return;

    intervalRef.current = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.dateTime);
        const timeDiff = reminderTime - now;

        // Trigger speech if reminder time is within ±2 seconds and not notified yet
        if (
          Math.abs(timeDiff) <= 2000 &&
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

  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

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
      setDeleteConfirmId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete reminder");
    }
  };

  // Format datetime string nicely for display
  const formatDateTime = (dateTime) => {
    const d = new Date(dateTime);
    return d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper to decide status text
  const getStatus = (dateTime) => {
    const now = new Date();
    return new Date(dateTime) <= now ? "Done" : "Pending";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 relative min-h-screen bg-gray-50">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
        My Reminders ({reminders.length})
      </h2>

      {reminders.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-8a2 2 0 00-2-2h-3m-6 10v-10a2 2 0 00-2-2H5a2 2 0 00-2 2v10m16 0H5"
            />
          </svg>
          <p className="text-lg font-semibold">No reminders found. Create one now!</p>
          <button
            onClick={() => navigate("/set-reminder")}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow transition"
          >
            Add Reminder
          </button>
        </div>
      ) : (
        <ul className="space-y-5">
          {reminders.map((reminder) => (
            <li
              key={reminder._id}
              className="bg-white shadow-lg rounded-lg p-5 border border-indigo-100 hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center"
              role="listitem"
              tabIndex={0}
            >
              <div className="flex-grow">
                <p className="text-indigo-700 font-semibold text-lg">{reminder.tasks}</p>
                <p className="text-gray-500 text-sm mt-1">{formatDateTime(reminder.dateTime)}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => confirmDelete(reminder._id)}
                    aria-label={`Delete reminder: ${reminder.tasks}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate("/set-reminder", { state: { reminders: reminder } })}
                    aria-label={`Edit reminder: ${reminder.tasks}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Status badge */}
              <div
                className={`ml-6 px-3 py-1 rounded-full text-sm font-semibold ${
                  getStatus(reminder.dateTime) === "Done"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
                aria-label={`Reminder status: ${getStatus(reminder.dateTime)}`}
              >
                {getStatus(reminder.dateTime)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Stop speaking popup */}
      {showStopPopup && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-8 right-8 bg-indigo-700 text-white rounded-lg shadow-lg p-4 max-w-xs w-full flex items-center justify-between space-x-4 z-50 animate-fadeIn"
        >
          <div className="flex-grow">
            <p className="font-semibold text-lg">it's time to {currentTask}.</p>
            <p className="text-sm mt-1 italic">Reminder is speaking...</p>
          </div>
          <button
            onClick={stopSpeaking}
            aria-label="Stop reminder speech"
            className="ml-4 bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}



      {/* Delete confirmation popup */}
      {deleteConfirmId && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="deleteConfirmTitle"
          aria-describedby="deleteConfirmDesc"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h3 id="deleteConfirmTitle" className="text-xl font-bold text-red-700 mb-4">
              Confirm Delete
            </h3>
            <p id="deleteConfirmDesc" className="mb-6">
              Are you sure you want to delete this reminder? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReminders;
