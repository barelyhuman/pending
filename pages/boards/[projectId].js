import Padding from 'components/padding'
import AuthNav from 'components/auth-nav'
import Spacer from 'components/spacer'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function BoardByProjectId ({ ...props }) {
  const router = useRouter()
  const { projectId } = router.query

  return <>
    <Padding all={2}>
      <AuthNav />
      <h1>Boards</h1>
      <Spacer y={1} />
      <section>
        {projectId}
      </section>
    </Padding>
  </>
}
