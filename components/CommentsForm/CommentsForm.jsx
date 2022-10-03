import React, { useState, useEffect } from 'react'
import s from './CommentsForm.module.scss'
import { submitComment } from '../../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  })

  useEffect(() => {
    setLocalStorage(window.localStorage)
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    }
    setFormData(initalFormData)
  }, [])

  const onInputChange = (e) => {
    const { target } = e
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }))
    }
  }

  const handlePostSubmission = () => {
    setError(false)
    const { name, email, comment, storeData } = formData
    if (!name || !email || !comment) {
      setError(true)
      return
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = ''
          formData.email = ''
        }
        formData.comment = ''
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }))
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
      }
    })
  }

  return (
    <div className={s.wrapper}>
      <h3>Leave a comment</h3>
      <div className={s.form}>
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          name='comment'
          placeholder='Comment'
          className={s.comment}
        />
        <div className={s.inputs}>
          <input
            type='text'
            value={formData.name}
            onChange={onInputChange}
            placeholder='Name'
            name='name'
            className={s.name}
          />
          <input
            type='email'
            value={formData.email}
            onChange={onInputChange}
            placeholder='Email'
            name='email'
            className={s.email}
          />
        </div>
      </div>
      <div className={s.submit}>
        <div className={s.submit__inner}>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true'
            className={s.checkbox}
          />
          <label htmlFor='storeData'>
            {' '}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
        <div>
          <button type='button' onClick={handlePostSubmission}>
            Post Comment
          </button>
          {showSuccessMessage && (
            <span>
              Comment submitted for review. The comment will be published after the confirmation of
              the author
            </span>
          )}
        </div>
      </div>
      {error && <p className={s.error}>All fields are mandatory</p>}
    </div>
  )
}

export default CommentsForm
