import Padding from 'components/padding'
import AuthNav from 'components/auth-nav'
import Spacer from 'components/spacer'
import Link from 'next/link'

export default function BoardByProjectId ({ ...props }) {
  return <>
    <Padding all={2}>
      <AuthNav />
      <h1>Boards</h1>
      <Spacer y={1} />
      <section />
    </Padding>
  </>
}
