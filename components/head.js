import NextHead from "next/head";

export default function Head({ children }) {
  return (
    <>
      <NextHead>
        <title>Pending | Kanban Board</title>
        {children}
      </NextHead>
    </>
  );
}
