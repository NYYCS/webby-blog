import type { NextPage } from 'next'

import { BlogLayout } from '../components/BlogLayout'
import { LoginForm } from '../components/LoginForm'


const Home: NextPage = () => {
  return (
    <BlogLayout>
      <LoginForm/>
    </BlogLayout>
  )
}

export default Home