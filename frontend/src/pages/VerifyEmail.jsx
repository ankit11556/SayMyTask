import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { verifyEmailApi } from '../services/AuthApi'
const VerifyEmail = () =>{
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Verifying...')
  const token = searchParams.get('token')
 

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      setMessage("Token not found in Url")
      return
    }
    const verifyEmail = async () => {
      try {
        const res = await verifyEmailApi(token)
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login")
        }, 4000)

      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };
    verifyEmail()
  },[token,navigate])
  return(
<div>
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>

      {message === "Email already verified" && (   
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      )}
    </div>
</div>
  )
}

export default VerifyEmail