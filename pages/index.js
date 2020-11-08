import Input from 'components/input'
import localforage from 'localforage'
import { useState, useEffect } from 'react'
import Board from 'components/board'
import { v4 as uuidv4 } from 'uuid'
import Padding from 'components/padding'
import Spacer from 'components/spacer'
import Link from 'next/link'
import axios from 'lib/axios'
import AuthNav from 'components/auth-nav'

export default function Home () {
  const [tasks, setTasks] = useState([])
  const [taskValue, setTaskValue] = useState('')

  useEffect(() => {
    localforage
      .getItem('tasks')
      .then((data) => {
        const _data = reformatData(data)

        setTasks(_data || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    localforage
      .setItem('tasks', tasks)
      .then((_) => {})
      .catch((err) => {
        console.log(err)
      })
  }, [tasks])

  const handleEnterKey = (e) => {
    setTaskValue(e.target.value)
    if (e.keyCode === 13) {
      setTasks([...tasks, { id: uuidv4(), task: e.target.value }])
      setTaskValue('')
    }
  }

  const reformatData = (data) => {
    if (!data) {
      return []
    }

    return data.map((item) => {
      if (!item.id) {
        item.id = uuidv4()
      }
      return item
    })
  }

  return (
    <>
      <Padding all={2}>
        <>
          <AuthNav />
        </>
        <Spacer y={3} />
        <div className='input-container'>
          <Input
            placeholder="What's on your mind?"
            value={taskValue}
            onChange={handleEnterKey}
            onKeyUp={handleEnterKey}
          />
        </div>
        <Spacer y={2} />
        <Board tasks={tasks} updateTasks={setTasks} />
      </Padding>
      <style jsx>
        {`
          .input-container {
            width: 100%;
          }

          .m-0 {
            margin: 0;
          }

          .p-0 {
            padding: 0;
          }
        `}
      </style>
    </>
  )
}
