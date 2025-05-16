import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export const userSignup = async (data) => {
  return await axios.post(`${API_URL}/auth/signup`,data)
}

export const userLogin = async (data) => {
  return await axios.post(`${API_URL}/auth/login`,data)
}

export const verifyEmailApi = async (token) => {
  return await axios.post(`${API_URL}/auth/verify-email`,{token:token})
}