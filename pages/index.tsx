import type { NextPage } from 'next'

import { BlogLayout } from '../components/BlogLayout'
import { BlogPaginator } from '../components/BlogPaginator'


const Home: NextPage = () => {
  return (
    <BlogLayout>
      <BlogPaginator/>
    </BlogLayout>
  )
}

export default Home
