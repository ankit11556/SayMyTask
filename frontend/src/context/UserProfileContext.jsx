import { createContext, useContext, useEffect, useState } from "react";
import { profileGet } from "../services/Api";
import { useAuth } from "./AuthContext";
const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const isProfileComplete = profile?.name && profile?.language;

  const { isAutheticated } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await profileGet();

        setProfile(response.data[0]);
      } catch (error) {
        console.log(error);
        setProfile(null);
      }
    };
    if (isAutheticated) {
      fetchProfileData();
    } else {
      setProfile(null);
    }
  }, [isAutheticated]);

  return (
    <UserProfileContext.Provider
      value={{ profile, setProfile, isProfileComplete }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
