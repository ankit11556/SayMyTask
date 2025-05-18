import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export const userSignup = async (data) => {
  return await axios.post(`${API_URL}/auth/signup`,data,
     {withCredentials: true},
  )
}

export const userLogin = async (data) => {
  return await axios.post(`${API_URL}/auth/login`,data,
     {withCredentials: true},
  )
}

export const verifyEmailApi = async (token) => {
  return await axios.post(`${API_URL}/auth/verify-email`,{token:token})
}

export const userLogout = async () => {
  return await axios.post(`${API_URL}/auth/logout`,{},
     {withCredentials: true},
  )
}