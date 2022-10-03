import React, { useEffect, useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import s from './Comments.module.scss'

import { getComments } from '../../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result)
    })
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className={s.wrapper}>
          <h3>Comments {comments.length}</h3>
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{parse(comment.comment)}</p>
              <p>
                <span>{comment.name}, </span> Date:{' '}
                {moment(comment.createdAt).format('MMMM DD, YYYY')}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
