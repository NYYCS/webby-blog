import { 
  NextPage, 
  NextPageContext, 
  GetStaticProps, 
  GetStaticPaths 
} from "next"
import { BlogLayout } from "../../components/BlogLayout"

import { BlogPage } from "../../components/BlogPage"

type BlogDetail = {
  blog_id: string
  blog_title: string
  blog_date: string
  blog_short_description: string
  blog_description: string
  blog_slug: string
  blog_created: string
  blog_updated: string
  blog_status: string
  blog_media: string
}

const Blog: NextPage<BlogDetail> = (props: BlogDetail) => {
  return (
    <BlogLayout>
      <BlogPage {...props}/>
    </BlogLayout>
  );
}


const getBlogs: () => Promise<Array<BlogDetail>> = async () => {
  return fetch("https://graph-api-test.webby.asia/graphql", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query{
          blogs(start:0 setting_language_slug:"en"){
            blog_id
            blog_title
            blog_date
            blog_short_description
            blog_description
            blog_slug
            blog_created
            blog_updated
            blog_status
            blog_media
        }
      }`}),
  }).then(res => res.json())
    .then(res => res.data.blogs)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogs = await getBlogs();
  const blog = blogs.find(x => x.blog_slug === params?.slug);
  return {
    props: {
      ...blog
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getBlogs();
  const paths = blogs.map(blog => ({
    params: { slug: blog.blog_slug }
  }))

  return { paths, fallback: 'blocking' }
}

export default Blog;