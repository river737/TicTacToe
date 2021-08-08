import styles from '../../styles/Lobby.module.css'
import {NameContext} from '../../components/form.js'
import {useRouter} from 'next/router'
import {useState, useEffect, useContext} from 'react'

export default function Lobby() {
  const data = useContext(NameContext);
  const router = useRouter();
  
  useEffect(()=>{
    if(data.name === '') {
      router.push('/');
    }
  }, [data.name]);
  return (
    <div>
      <div className={styles.lobby}>
        <h1>Lobby</h1>
      </div>
    </div>
  )
}
