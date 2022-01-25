import type { NextPage } from 'next'

import { BlogLayout } from '../components/BlogLayout'
import { RegisterForm } from '../components/RegisterForm'


const Home: NextPage = () => {
  return (
    <BlogLayout>
      <RegisterForm/>
    </BlogLayout>
  )
}

export default Home