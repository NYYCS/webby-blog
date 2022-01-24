import React from 'react';
import Image from 'next/image'

type BlogPageProps = {
  blog_id: string,
  blog_title: string,
  blog_date: string,
  blog_short_description: string,
  blog_description: string,
  blog_slug: string,
  blog_created: string,
  blog_updated: string,
  blog_status: string,
  blog_media: string
}

const BlogPage: React.FC<BlogPageProps> = ({
  blog_id,
  blog_title,
  blog_date,
  blog_short_description,
  blog_description,
  blog_slug,
  blog_created,
  blog_updated,
  blog_status,
  blog_media
}) => {
  const readableDate = new Date(blog_date).toLocaleDateString("en-gb", { day: "numeric", month: "short", year:'numeric' });
  const readableTime = new Date(blog_date).toLocaleTimeString("en-gb", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col gap-4 w-full max-w-screen-lg">
      <div className="flex flex-col gap-2 p-4 w-full">
        <div className="flex_row flex items-center gap-4">
          <span className="text-2xl text-gray-500">{blog_id}</span>
          <h1 className="font-bold text-4xl">{blog_title}</h1>
        </div>
        <h2 className="text-2xl">{blog_short_description}</h2>
        <h3 className="text-gray-500">{`${readableDate} on ${readableTime}`}</h3>
        <div className="flex flex-row gap-4 text-gray-500 items-center">
          <span className="flex flex-row gap-2">
           <label>Created by:</label>
           <span className="w-32">{blog_created}</span> 
          </span>
          <span className="flex flex-row gap-2">
           <label>Updated on:</label>
           <span className="w-32">{blog_updated}</span> 
          </span>
          <span className="flex flex-row gap-2">
           <label>Status:</label>
           <span className="w-32">{blog_status}</span> 
          </span>
        </div>
      </div>
      <div className="flex h-64 bg-gray-500 w-full">
        {blog_media && <Image alt='blog-media' src={blog_media}/>}
      </div>
      <hr className="border-b opacity-50 border-black"/>
      <article className="text-lg">
        {blog_description}
      </article>
    </div>
  );
}

export { BlogPage }