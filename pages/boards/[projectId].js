import { useEffect, useState } from 'react'
import Padding from 'components/padding'
import AuthNav from 'components/auth-nav'
import Spacer from 'components/spacer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from '../../lib/axios'

export default function BoardByProjectId ({ ...props }) {
  const [projectDetails, setProjectDetails] = useState({})
  const router = useRouter()
  const { projectId } = router.query

  useEffect(() => {
    if (projectId) {
      fetchProjectById()
    }
  }, [projectId])

  function fetchProjectById () {
    return axios.get(`/api/projects/${projectId}`)
      .then(response => {
        setProjectDetails(response.data.data.project)
      }).catch(err => {
        console.error(err)
      })
  }

  return <>
    <Padding all={2}>
      <AuthNav />
      <h1>Boards</h1>
      <Spacer y={1} />
      <section>
        {projectDetails.name}
      </section>
    </Padding>
  </>
}
