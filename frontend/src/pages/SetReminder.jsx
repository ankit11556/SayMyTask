import { useEffect, useState } from "react"
import { editReminder, postReminder, profileGet } from "../services/Api";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfile from "./UserProfileForm";
import { useAuth } from "../context/AuthContext";

const SetReminder = () => {
  const { user, setUser } = useAuth();
  const [showProfileForm, setShowProfileForm] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state?.reminders || null;

  const [tasks, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const dateTime = date && time ? new Date(`${date}T${time}:00`).toISOString() : null;


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await profileGet();
        const [{ name, language }] = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          name,
          language,
        }));
      } catch (error) {
        console.log("User profile fetch failed", error);
      }
    };

    if (!user.name || !user.language) {
      fetchUserProfile();
    }
  }, [user.name, user.language, setUser]);

  useEffect(() => {
    setShowProfileForm(!(user.name && user.language));
  }, [user]);

  useEffect(() => {
    if (isEditMode) {
      setTask(isEditMode.tasks);

      const localDateTime = new Date(isEditMode.dateTime);
      const dateStr = localDateTime.toISOString().slice(0, 10);
      setDate(dateStr);

      const timeStr = localDateTime.toTimeString().slice(0, 5);
      setTime(timeStr);
    }
  }, [isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const response = await editReminder(isEditMode._id, { tasks, dateTime });
        alert(response.data.message);
      } else {
        const response = await postReminder({ tasks, dateTime });
        alert(response.data.message);
      }
      navigate("/my-reminders");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  if (showProfileForm) {
    return <UserProfile onComplete={() => setShowProfileForm(false)} />;
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Set Your Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-blue-600 font-semibold text-lg">Reminder Task</label>
            <input
              placeholder="e.g. Eat the food / Do your homework / Play the game"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition py-6"
              rows="4"
              value={tasks}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-600 font-semibold text-lg">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-600 font-semibold text-lg">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:scale-105 transform transition-transform shadow-md"
          >
            {isEditMode ? "Update Reminder" : "Set Reminder"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SetReminder;
