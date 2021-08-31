import {useState, useContext} from 'react'


import { PusherContext } from '../../contexts/pusherContext'
import { InfoContext } from '../../contexts/infoContext'
import {RouteContext} from '../../contexts/routeContext'
import { AlertContext } from '../../contexts/alertContext'

import globalFetch from '../../functions/globalFetch'

import styles from '../../../styles/login/Login.module.css'

import Logo from '../Logo'

export default function Login() {
    const {setAlert} = useContext(AlertContext)
    const {setRoute} = useContext(RouteContext)
    const {data, setData} = useContext(InfoContext);
    const {name} = data
    const [input, setInput] = useState({active: false})
    const [error, setError] = useState({verify: false, msg: ''});
    const {socketId} = useContext(PusherContext)

    const inputChange = (e) => { // handles the username input change
        setData(obj => {
            const objx = {...obj}
            objx.name = e.target.value
            return objx
        });
        setError({verify: false})
    }

    const submit = async () => {
        if(name !== '') { // prevent submit if the username is blank
            setData(obj => {
                const objx = {...obj}
                objx.identified= true
                return objx
            });
            try {
                const res = await globalFetch({path: '/api/login', socketId, body: {check: true, username: name}})

                if(res.success) {
                    setRoute({name: 'lobby'})
                } else {
                    setError({verify: true, msg: res.error.msg});
                }
            }
            catch(err) {
                setAlert({show: true, data: {
                    title: "An error occured",
                    theme: "danger",
                    msg: "Please refresh the page. An error occured unexpectedly."
                }})
            }
        } else setError({verify: true, msg: `Error! Name cannot be empty!`})
    }

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