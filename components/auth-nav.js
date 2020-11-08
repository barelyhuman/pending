import Link from 'next/link'
import Spacer from './spacer'
import AuthFactory from 'lib/auth-factory'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AuthNav ({ ...props }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  const router = useRouter()

  useEffect(() => {
    const authChanges = AuthFactory.onAuthStatusChange((status) => {
      setIsAuthenticated(status.authStatus)
      setUsername(status.user.email)
    })
    return authChanges.unsubscribe
  }, [])

  const handleLogout = (e) => {
    AuthFactory.logout()
    return router.push('/login')
  }

  return (
    <>
      <h1 align='center' className='m-0 p-0'>
        Pending
      </h1>
      <p align='center' className='m-0 p-0'>
        <span>
          <small>Simple Kanban Board</small>
        </span>
      </p>
      <Spacer y={2} />
      {!isAuthenticated ? (
        <>
          <div align='center'>
            <Link href='/login'>Login</Link>
            <Spacer x={1} inline />
            <Link href='/register'>Register</Link>
          </div>
        </>
      ) : (
        <>
          <div align='center'>Hello, {username}</div>
        </>
      )}
      {isAuthenticated ? (
        <nav>
          <ul>
            <Link href='/'>
              <a>Home</a>
            </Link>
            <Link href='/projects'>
              <a>Projects</a>
            </Link>
            <Link href='/teams'>
              <a>Teams</a>
            </Link>
            <Link href='/settings'>
              <a>Settings</a>
            </Link>
            <a onClick={handleLogout} className='error-text trigger'>
              Logout
            </a>
          </ul>
        </nav>
      ) : null}
      <style jsx>
        {`
          nav ul a {
            display: inline-block;
            margin-right: 16px;
          }

          .trigger {
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
