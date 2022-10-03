import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import s from './Header.module.scss'
import { Categories } from '../index'
import { getCategories } from '../../services'

const Header = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])
  return (
    <header className={s.header}>
      <Link href='/'>
        <a className={s.logo}>Web Blog.</a>
      </Link>
      <Categories />
    </header>
  )
}

export default Header
