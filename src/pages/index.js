import styles from '../../styles/Home.module.css'
import Content from '../../components/content.js'
import {NameContext} from '../../components/form.js'
import {useState, useContext} from 'react'

export default function Home() {
  const data = useContext(NameContext)

  return (
    <div className={styles.container}>
       <Content player={data.name} />
    </div>
  )
}
