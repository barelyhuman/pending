import axios from 'lib/axios'
import AuthNav from 'components/auth-nav'
import Padding from 'components/padding'
import Spacer from 'components/spacer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AddProject () {
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const router = useRouter()

  const onSubmit = () => {
    axios
      .post('/api/projects', {
        name,
        description
      })
      .then((response) => {
        if (response.data && response.data.id) {
          router.push('/projects')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <Padding all={2}>
        <AuthNav />
        <h1>Add a New Project</h1>

        <Link href='/projects'>
          <a href=''>back</a>
        </Link>

        <Spacer y={2} />

        <section>
          <div>
            <input
              type='text'
              placeholder='Project Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Spacer y={2} />
          <div>
            <textarea
              type='text'
              placeholder='Project Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Spacer y={2} />
          <button onClick={onSubmit}>Add Project</button>
        </section>
      </Padding>
    </>
  )
}
