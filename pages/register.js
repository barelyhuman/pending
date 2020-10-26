import { useState } from 'react'
import axios from 'axios'
import ToastNotification from 'lib/toast'
import { useRouter } from 'next/router'

export default function LoginScreen ({ ...props }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        confirmPassword
      })

      if (response.data.id) {
        router.push('/')
      }
    } catch (err) {
      console.error(err)
      ToastNotification.error(err.response.data.message)
    }
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor=''>Email</label>
          <input type='email' onKeyUp={handleEmailChange} />
        </div>
        <div>
          <label htmlFor=''>Password</label>
          <input type='password' onKeyUp={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor=''>Confirm Password</label>
          <input type='password' onKeyUp={handleConfirmPasswordChange} />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>
            Register
          </button>
        </div>
      </div>
    </>
  )
}
