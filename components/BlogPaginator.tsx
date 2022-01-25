import React, { useState, useCallback, useEffect } from 'react'
import { BlogPreview } from './BlogPreview'

const Loading: React.FC = () => {
  return (
    <div className="text-4xl font-bold animate-pulse">
      Loading...
    </div>
  )
}

const Empty: React.FC<{ back: () => void }> = ({ back }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xl">No More Blogs.</div>
      <div className="text-xs" onClick={back}>go back?</div>
    </div>
  )
}

const BlogPaginator: React.FC = () => {

  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    fetch("https://graph-api-test.webby.asia/graphql", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getBlogs($start: Int){
            blogs(start:$start limit:3 setting_language_slug:"en"){
              blog_id
              blog_description
              blog_title
              blog_media
              blog_slug
            }
          }
        `,
        variables: {
          start: page * 3,
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      setLoading(false);
      setBlogs(res.data.blogs);
    });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
  }, [page, fetchBlogs]);

  
  const onPrev = () => {
    if (page > 0) setPage(page - 1);
  }

  const onNext = () => {
    if (blogs.length > 0) setPage(page + 1);
  }
  

  return (
    <div className="flex flex-col items-center w-full h-full gap-4 max-w-prose">
      <div className="flex flex-row justify-start w-full">
        <div className="text-xl font-bold">Blogs</div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
        {loading ? <Loading/>: blogs.map((props, i) => <BlogPreview key={i} {...props}/>)}
        {!loading && blogs.length === 0 && <Empty back={onPrev}/>}
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <button type="button" className="flex" onClick={onPrev}>{'<'}</button>
        <span className="flex font-bold text-gray-500">{page + 1}</span>
        <button type="button" className="flex" onClick={onNext}>{'>'}</button>
      </div>
    </div>
  );
}


export { BlogPaginator }