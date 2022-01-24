import type { NextPage } from 'next'

import { BlogLayout } from '../components/BlogLayout'
import { BlogPaginator } from '../components/BlogPaginator'

const props = {
  id: "1",
  title: "test en",
  date: "2021-10-30 20:00:00",
  shortDescription: "test short_desc en",
  description: "test desc lorem ipsum en",
  slug: "blog1"
}

const Home: NextPage = () => {
  return (
    <BlogLayout>
      <BlogPaginator/>
    </BlogLayout>
  )
}

export default Home
