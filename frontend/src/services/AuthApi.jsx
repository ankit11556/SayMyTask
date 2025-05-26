import axiosInstance from "../api/axiosInstance";

export const userSignup = async (data) => {
  return await axiosInstance.post(`/auth/signup`,data
  )
}

export const userLogin = async (data) => {
  return await axiosInstance.post(`/auth/login`,data)
}

export const verifyEmailApi = async (token) => {
  return await axiosInstance.post(`/auth/verify-email`,{token:token})
}

export const userLogout = async () => {
  return await axiosInstance.post(`/auth/logout`,{})
}

export const userCheckAuth = async () => {
  return await axiosInstance.get(`/auth/check-auth`)
}