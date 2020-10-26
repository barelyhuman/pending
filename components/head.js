import NextHead from 'next/head'

export default function Head ({ children }) {
  return (
    <>
      <NextHead>
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <title>Pending | Kanban Board</title>
        {children}
      </NextHead>
    </>
  )
}
