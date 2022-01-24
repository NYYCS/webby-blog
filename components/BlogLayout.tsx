import React from 'react';
import Link from 'next/link';


const BlogLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen flex-1 bg-gray-50 overflow-x-hidden justify-start">
      <nav className="flex flex-col items-center gap-4 bg-white p-4">
        <Link href='/'>
          <a className="text-2xl font-bold">Blog.io</a>
        </Link>
      </nav>
      <main className="flex flex-col items-center p-4 flex-1">
        { children }
      </main>
    </div>
  )
}

export { BlogLayout }