import { FaUser } from "react-icons/fa";
import { useUserProfile } from "../context/UserProfileContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { profile } = useUserProfile();

  const navigate = useNavigate();
  return (
    <div className="w-full  flex items-center justify-center bg-gray-50 p-11">
      <div className="bg-white w-full max-w-md shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>

        {/* Icon */}
        <div className="text-6xl text-gray-600">
          <FaUser />
        </div>

        {/* Info Box */}
        <div className="w-full border rounded-xl divide-y">
          {/* Name */}
          <div className="flex justify-between p-4">
            <span className="text-gray-500 italic">Name</span>
            <span className="font-semibold">{profile?.name}</span>
          </div>

          {/* Language */}
          <div className="flex justify-between p-4">
            <span className="text-gray-500 italic">Language</span>
            <span className="font-semibold">{profile?.language}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate("/user-profile")}
          className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
