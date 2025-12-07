import { useEffect, useState } from "react";
import { profileEdit, profileSave } from "../services/Api";
import { useUserProfile } from "../context/UserProfileContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");

  const { isProfileComplete } = useUserProfile();
  const { profile, setProfile } = useUserProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (isProfileComplete && profile) {
      // edit mode
      setName(profile.name);
      setLanguage(profile.language);
    } else {
      // new mode → empty form
      setName("");
      setLanguage("");
    }
  }, [isProfileComplete, profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isProfileComplete && profile) {
        const res = await profileEdit(profile._id, { name, language });
        setProfile(res.data.edit);
        alert(res.data.message);
        navigate("/");
      } else {
        const response = await profileSave({ name, language });
        setProfile(response.data.newProfile);
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-9.5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 text-center">
          To personalize your reminders, please enter your name and preferred
          language.
        </p>

        <div>
          <label className="block mb-1 text-blue-700 font-medium">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-blue-700 font-medium">
            Preferred Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="hi"> Hindi</option>
            <option value="ta">Tamil</option>
            <option value="ko">Korean</option>
            <option value="it">Italian</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition font-semibold"
        >
          {isProfileComplete ? "Edit" : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
