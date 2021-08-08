import styles from '../../styles/Home.module.css'
import Content from '../../components/content.js'
import Form from '../../components/form.js'
import {useState} from 'react'

export default function Home() {
  const [currentuser, player] = useState('');

  function playername(name) {
    player(name);
  }

  return (
    <div className={styles.container}>
      <Form onPlayer={playername} />

      <Content player={currentuser}/>
    </div>
  )
}
