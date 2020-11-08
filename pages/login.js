import { useState } from 'react'
import axios from 'lib/axios'
import ToastNotification from 'lib/toast'
import { useRouter } from 'next/router'

export default function LoginScreen ({ ...props }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    try {
      const status = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (status.data.data.success) {
        router.push('/')
      }
    } catch (err) {
      ToastNotification.error(err.response.data.message)
    }
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor=''>Email</label>
          <input type='email' value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </div>
    </>
  )
}
