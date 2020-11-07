import Link from 'next/link'
import Spacer from './spacer'
import AuthFactory from 'lib/auth-factory'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AuthNav ({ ...props }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const authChanges = AuthFactory.onAuthStatusChange((auth) => {
      setIsAuthenticated(auth)
    })
    return authChanges.unsubscribe
  }, [])

  const handleLogout = () => {
    AuthFactory.logout()
    setTimeout(() => {
      router.reload()
      router.push('/')
    }, 500)
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
            <a href='#' onClick={handleLogout}>
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
        `}
      </style>
    </>
  )
}
