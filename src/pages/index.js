import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'

import { SocketContext } from '../contexts/socketContext';
import {InfoContext} from '../components/form.js'

import styles from '../../styles/Home.module.css'

import Logo from '../components/Logo'

export default function Home() {

  const router = useRouter()
  const {data, setData} = useContext(InfoContext);
  const {name} = data
  const [error, setError] = useState({verify: false, msg: ''});
  const {socket} = useContext(SocketContext)

  const inputChange = (e) => { // handles the username input change
    data.name = e.target.value;
    setData(data);
    setError({verify: false})
  }

  const submit = () => {
    if(name !== '') { // prevent submit if the username is blank
      data.identified = true;
      setData(data);
      socket.emit('submit_username', {username: name})
    } else setError({verify: true, msg: `Error! Name cannot be empty!`})
  }

  useEffect(() => {
    console.log(data)
    if(data.identified) router.push('/lobby')
  })

  useEffect(()=>{
    socket.on('submit_username_response', (res) => { // waiting for a response from the server after submitting
      if(res.success) {
        document.cookie = `username=${name};path=/;max-age=86400;sameSite=Strict;`
        router.push('/lobby')
      } else { // an error occured
        const {msg} = res.error
        setError({verify: true, msg});
      }
    })
    return () => socket.off('submit_username_response')
  }, [name])



  return (
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <div>
            <div className={styles.loginTop}>
              <Logo />
            </div>
            <div className={styles.loginBody}>
              <label>
                <span className={styles.inputTitle}>USERNAME</span>
                <div className={styles.inputContainer}>
                  <input type="text" className={styles.input} onChange={inputChange} value={name} placeholder="Enter a name" />
                  {
                    error.verify &&
                      <span className={styles.inputError}>
                        <i className={`fa fa-exclamation-circle ${styles.errorIcon}`}/>
                        <span className={styles.errorMsg}>{error.msg}</span>
                      </span>
                  }
                </div>
              </label>
              <button className={styles.button} onClick={submit}>CONTINUE</button>
              <span className={styles.copyright}>
                Copyright
                <i className="far fa-copyright"/>
                2021
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}
