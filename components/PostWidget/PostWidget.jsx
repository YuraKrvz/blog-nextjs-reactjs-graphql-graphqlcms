import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import s from './PostWidget.module.scss'
import { getRecentPosts, getSimilarPosts } from '../../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res))
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res))
    }
  }, [slug])

  return (
    <div className={s.wrapper}>
      <h3>{slug ? 'Related post' : 'Recent post'}</h3>
      {relatedPosts.map((post) => (
        <Link key={post.title} href={`/post/${post.slug}`}>
          <div className={s.post}>
            <div className={s.image}>
              <Image src={post.featuredImage.url} alt={post.title} width='80px' height='50px' />
            </div>
            <div>
              <p>{post.title}</p>
              <p>{moment(post.createdAt).format('MM DD, YYYY')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
