import axios from 'axios'
import PubSub from 'lib/pub-sub'

const pub = new PubSub()

const AuthFactory = {}

function fetchMe () {
  return axios
    .get('/api/me')
    .then((response) => {
      return { auth: true }
    })
    .catch((err) => {
      if (err.status === 401) {
        return { auth: false }
      }
      return false
    })
}

function logOut () {
  return axios
    .get('/api/auth/logout')
    .then((response) => {
      return AuthFactory.setAuthStatus()
    })
    .catch((err) => {
      console.log(err)
    })
}

AuthFactory.logout = () => {
  logOut()
}

AuthFactory.setAuthStatus = () => {
  fetchMe().then((authState) => {
    if (authState) {
      pub.emit('authStatus', authState.auth)
    }
  })
}

AuthFactory.onAuthStatusChange = (cb) => {
  AuthFactory.setAuthStatus()
  return pub.subscribe('authStatus', cb)
}

export default AuthFactory
