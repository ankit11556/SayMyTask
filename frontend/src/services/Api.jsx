import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postReminder = async (reminderData) => {
  return await axios.post(`${API_URL}/reminders`,reminderData,
    {withCredentials: true}
  )
}

export const getReminder = async () => {
  return await axios.get(`${API_URL}/reminders`,
     {withCredentials: true},
  )
}

export const editReminder = async (id,reminderData) => {
  return await axios.put(`${API_URL}/reminders/${id}`,reminderData,
     {withCredentials: true},
  )
}

export const deleteReminder = async (id) => {
  return await axios.delete(`${API_URL}/reminders/${id}`, {withCredentials: true},)
}

export const profileSave = async (data) => {
  return await axios.post(`${API_URL}/user-profile`,data,
    {withCredentials: true},
  )
}

export const profileGet = async()=>{
  return await axios.get(`${API_URL}/user-profile`,
    {withCredentials: true}
  )
}