import AuthNav from 'components/auth-nav'
import Padding from 'components/padding'

export default function Settings () {
  return (
    <>
      <Padding all={2}>
        <AuthNav />
        <h1>Settings</h1>
      </Padding>
    </>
  )
}
