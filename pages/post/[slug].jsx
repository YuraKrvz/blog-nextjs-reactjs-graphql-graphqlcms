import React from 'react'
import { useRouter } from 'next/router'
import { PostDetail, PostWidget, Comments, CommentsForm } from '../../components'
import {getPosts, getPostDetails} from '../../services'

const PostDetails = ({ post }) => {
  const router = useRouter()
  return (
    <>
      <div>
        <PostDetail post={post} />
        <CommentsForm slug={post.slug} />
        <div className='post_detail'>
          <PostWidget
            slug={post.slug}
            categories={post.categories.map((category) => category.slug)}
          />
          <Comments slug={post.slug} />
        </div>
        <button className="btn__back" onClick={() => router.push('/')}>
          <a>Back</a>
        </button>
      </div>
    </>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  }
}
