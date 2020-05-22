import React from 'react'
import { useParams } from 'react-router-dom'

const Page = ({pages = []}) => {
  const { staticPage } = useParams();
  const page = pages.find(s => s.path.current === staticPage)
  return (<div>
      <h1>{page.title}</h1>
      <h3>This is the main page for {page.title}</h3>
    </div>
  );
}

export default Page
