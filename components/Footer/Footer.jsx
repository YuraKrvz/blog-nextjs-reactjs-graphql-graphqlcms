import React from 'react'
import s from './Footer.module.scss'

const Footer = ({ children }) => {
  return (
    <footer className={s.footer}>
      <p>
        <span>Footer:</span> Generated with Next.js. Also applied graphql, graphql-request, sass,
        moment etc.
      </p>
    </footer>
  )
}

export default Footer
