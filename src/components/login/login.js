import {useState, useContext, useEffect} from 'react'


import { SocketContext } from '../../contexts/socketContext'
import { InfoContext } from '../../contexts/infoContext'
import {RouteContext} from '../../contexts/routeContext'

import styles from '../../../styles/login/Login.module.css'

import Logo from '../Logo'

export default function Login() {
    const {setRoute} = useContext(RouteContext)
    const {data, setData} = useContext(InfoContext);
    const {name} = data
    const [input, setInput] = useState({active: false})
    const [error, setError] = useState({verify: false, msg: ''});
    const {socket} = useContext(SocketContext)

    const inputChange = (e) => { // handles the username input change
        setData(obj => {
            const objx = {...obj}
            objx.name = e.target.value
            return objx
        });
        setError({verify: false})
    }

    const submit = () => {
        if(name !== '') { // prevent submit if the username is blank
            setData(obj => {
                const objx = {...obj}
                objx.identified= true
                return objx
            });
            socket.emit('submit_username', {username: name})
        } else setError({verify: true, msg: `Error! Name cannot be empty!`})
    }

    useEffect(()=>{
        socket.on('submit_username_response', (res) => { // waiting for a response from the server after submitting
            if(res.success) {
                document.cookie = `username=${name};path=/;max-age=86400;sameSite=Strict;`
                setRoute({name: 'lobby'})
            } else { // an error occured
                const {msg} = res.error
                setError({verify: true, msg});
            }
        })
        return () => socket.off('submit_username_response')
    }, [name, setRoute])

    const inputFocus = () => {
        setInput({active: true})
    }

    const inputBlur = () => {
        setInput({active: false})
    }

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
                            <div className={`${styles.inputContainer} ${input.active ? styles.inputActive : ''}`}>
                            <input type="text" className={styles.input} onFocus={inputFocus} onBlur={inputBlur} onChange={inputChange} value={name} placeholder="Enter a name" />
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