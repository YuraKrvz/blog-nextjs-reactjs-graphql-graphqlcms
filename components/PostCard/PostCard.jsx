import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import s from './PostCard.module.scss'

const PostCard = ({ post }) => {
  return (
    <Link href={`post/${post.slug}`}>
      <div className={s.wrapper}>
        <h3>{post.title}</h3>
        <div className={s.image}>
          <Image
            src={post.featuredImage.url}
            alt='url from CMS'
            width={500}
            height={300}
            objectFit='cover'
          />
        </div>
        <p>{post.excerpt}</p>

        <div className={s.info}>
          <div>
            <div className={s.image_author}>
              <Image src={post.author?.photo?.url} alt={post.author.name} width={40} height={40} />
            </div>
            <p>Author: {post.author.name}</p>
          </div>
          <div>Date: {moment(post.createdAt).format('MMMM DD, YYYY')}</div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
