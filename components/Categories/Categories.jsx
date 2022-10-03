import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import s from './Categories.module.scss'
import { getCategories } from '../../services'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])
  return (
    <>
      <div className={s.category}>
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span>#{category.name}&nbsp;&nbsp;</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Categories
