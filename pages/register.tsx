import type { NextPage } from 'next'

import { BlogLayout } from '../components/BlogLayout'
import { RegisterForm } from '../components/RegisterForm'


const RegisterPage: NextPage = () => {
  return (
    <BlogLayout>
      <RegisterForm/>
    </BlogLayout>
  )
}

export default RegisterPage