import Toastify from 'toastify-js'

const ToastNotification = {
  success (message) {
    return Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#121212',
      stopOnFocus: false
    }).showToast()
  },
  error (message) {
    return Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#e00',
      stopOnFocus: false
    }).showToast()
  }
}

export default ToastNotification
