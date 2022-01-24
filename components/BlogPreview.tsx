import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type BlogProps = {
  blog_id: string
  blog_description: string
  blog_title: string
  blog_media: string
  blog_slug: string
}


const BlogPreview: React.FC<BlogProps> = ({
  blog_id,
  blog_title,
  blog_description,
  blog_media,
  blog_slug
}) => {

  return (
    <Link href={`/blog/${blog_slug}`} passHref={true}>
      <div className="flex flex-row bg-white rounded-xl w-full shadow">
        <div className="flex flex-col flex-1 p-4">
          <div className="font-bold text-xl">{blog_title}</div>
          <div className="text-gray-500 leading-4 h-16">{blog_description}</div>
          <div className="text-gray-300 text-xs">{blog_id}</div>
        </div>
        <div className="flex w-48 bg-gray-500 rounded-br-xl border rounded-tr-xl shadow">
          {blog_media && <Image alt={`${blog_id}-media`} src={blog_media}/>}
        </div>
      </div>
    </Link>
  )
}

export { BlogPreview }