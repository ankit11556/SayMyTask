import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postReminder = async (reminderData) => {
  return await axios.post(`${API_URL}/reminders`,reminderData)
}

export const getReminder = async () => {
  return await axios.get(`${API_URL}/reminders`)
}

export const editReminder = async (id,reminderData) => {
  return await axios.put(`${API_URL}/reminders/${id}`,reminderData)
}

export const deleteReminder = async (id) => {
  return await axios.delete(`${API_URL}/reminders/${id}`)
}