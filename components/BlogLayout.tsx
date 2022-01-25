import React, { useContext } from 'react';
import Link from 'next/link';

import { AuthContext } from './context/AuthContext';
import { useRouter } from 'next/router';


const BlogLayout: React.FC = ({ children }) => {
  const { user, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  const onLogout = () => {
    logout()
      .then(res => router.push("/"));
  }
              
  return (
    <div className="flex flex-col justify-start flex-1 w-screen h-screen overflow-x-hidden bg-gray-50">
      <nav className="flex flex-row items-center w-full gap-4 p-4 bg-white">
        <div className="flex flex-1"/>
        <Link href='/'>
          <a className="text-2xl font-bold">Blog.io</a>
        </Link>
        <div className="flex flex-row items-center justify-center flex-1 gap-4">
          {!loading && !user && <Link href='/login'><a>Login</a></Link>}
          {user && <>
            <span className="text-sm">{`id: ${user.user_id}`}</span>
            <span onClick={onLogout}>Logout</span>
          </>}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </div>
      </nav>
      <main className="flex flex-col items-center flex-1 p-4">
        { children }
      </main>
    </div>
  )
}

export { BlogLayout }