import { useContext } from "react"

import {AlertContext} from '../contexts/alertContext'

import styles from '../../styles/Alert.module.css'

export default function Alert() {
    const {alert, setAlert} = useContext(AlertContext)
    const {title='', msg='', theme='default' || 'success' || 'warning' || 'danger' , action=[]} = alert.data
    const close = () => {
        setAlert({show: false})
    }
    const themeX = {}
    
    switch(theme) {
        case 'success':
            themeX.icon="fa fa-check"
            break;
        case 'warning':
            themeX.icon="fa fa-exclamation"
        case 'danger':
            themeX.icon = "fa fa-exclamation"
            break;
        default:
            themeX.icon="fa fa-info"
            break;
    }


    return (
        <div className={`${styles.alert} ${styles[theme]}`}>
            <div className={styles.left}>
                <span>
                    <span>
                        <i className={themeX.icon} />
                    </span>
                </span>
            </div>
            <div className={styles.mid}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    {msg}
                </div>
                {
                    action.length > 0 ?
                        <div className={styles.footer}>
                            {
                                action.map(({content, click, theme='primary'}, i) => {
                                    return (
                                        <button className={styles[theme]} onClick={click} key={i}>
                                            {content}
                                        </button>
                                    )
                                })
                            }
                            
                        </div>
                    : ''
                }
            </div>
            <div className={styles.right}>
                <button onClick={close}><i className="fa fa-times"/></button>
            </div>
        </div>
    )
}