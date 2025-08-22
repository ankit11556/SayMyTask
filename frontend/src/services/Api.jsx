import axiosInstance from "../api/axiosInstance";


export const postReminder = async (reminderData) => {
  return await axiosInstance.post(`/reminders`,reminderData)
}

export const getReminder = async () => {
  return await axiosInstance.get(`/reminders`)
}

export const editReminder = async (id,reminderData) => {
  return await axiosInstance.put(`/reminders/${id}`,reminderData)
}

export const deleteReminder = async (id) => {
  return await axiosInstance.delete(`/reminders/${id}`)
}

export const profileSave = async (data) => {
  return await axiosInstance.post(`/user-profile`,data)
}

export const profileGet = async()=>{
  return await axiosInstance.get(`/user-profile`)
}