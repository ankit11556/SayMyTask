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
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };
    verifyEmail()
  },[token,navigate])
  return(
<div>
  <h2>{message}</h2>
</div>
  )
}

export default VerifyEmail