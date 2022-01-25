import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { BlogLayout } from '../components/BlogLayout'
import { LoginForm } from '../components/LoginForm'

import { useUser } from '../lib/useUser'


const LoginPage: NextPage = () => {
  const router = useRouter();
  const [user, loading] = useUser();

  if (user) router.push('/');

  return (
    <BlogLayout>
      <LoginForm/>
    </BlogLayout>
  )
}

export default LoginPage