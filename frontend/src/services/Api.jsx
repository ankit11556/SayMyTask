import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postReminder = async (reminderData) => {
   console.log(reminderData);
  return await axios.post(`${API_URL}`,reminderData)
}

export const getReminder = async () => {
  return await axios.get(`${API_URL}`)
  
}