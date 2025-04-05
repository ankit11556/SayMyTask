import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postReminder = async (reminderData) => {
  // console.log(reminderData);
  return await axios.post(`${API_URL}`,reminderData)
}