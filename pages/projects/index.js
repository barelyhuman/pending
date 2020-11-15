import axios from 'lib/axios'
import AuthNav from 'components/auth-nav'
import Padding from 'components/padding'
import Spacer from 'components/spacer'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Projects () {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  function fetchProjects () {
    axios
      .get('/api/projects')
      .then((response) => {
        setProjectList(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function renderProjectList () {
    if (!projectList || (projectList && !projectList.length)) {
      return <>No Projects</>
    }

    const projectlistNodes = projectList.map((item) => {
      return (
        <>
          <li>
            <Link href={`/boards/${item.project.id}`}>
              {item.project.name}
            </Link>
          </li>
        </>
      )
    })

    return (
      <>
        <ul>{projectlistNodes}</ul>
      </>
    )
  }

  return (
    <>
      <Padding all={2}>
        <AuthNav />
        <h1>Projects</h1>

        <Link href='/projects/add'>
          <a href=''>Add Project</a>
        </Link>
        <Spacer y={1} />
        <section>{renderProjectList()}</section>
      </Padding>
    </>
  )
}
