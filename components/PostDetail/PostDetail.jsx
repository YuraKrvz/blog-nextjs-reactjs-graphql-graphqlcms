import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import s from './PostDetail.module.scss'

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className='text-xl font-semibold mb-4'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className='mb-8'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index} className='text-md font-semibold mb-4'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'image':
        return (
          <img key={index} alt={obj.title} height={obj.height} width={obj.width} src={obj.src} />
        )
      default:
        return modifiedText
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Image src={post.featuredImage.url} alt={post.title} width={500} height={300} />
      </div>
      <h3>{post.title}</h3>
      <div className={s.text}>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item),
          )
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>

      <div className={s.info}>
        <div className={s.image_author}>
          <Image src={post.author.photo.url} alt={post.author.name} width={40} height={40} />
        </div>
        <p>{post.author.name}</p>
        Date: {moment(post.createdAt).format('MMM DD, YYYY')}
      </div>
    </div>
  )
}

export default PostDetail
