import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postReminder = async (reminderData) => {
  return await axios.post(`${API_URL}`,reminderData)
}

export const getReminder = async () => {
  return await axios.get(`${API_URL}`)
}

export const editReminder = async (reminderData,id) => {
  return await axios.put(`${API_URL}/${id}`,reminderData)
}

export const deleteReminder = async (id) => {
  return await axios.delete(`${API_URL}/${id}`)
}