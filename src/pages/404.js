import styles from '../../styles/error.module.css'
import Link from 'next/link'

export default function error() {
  return (
    <div className={styles.errorpage}>
      <h2>Error 404 page!</h2>
      <h5>go <Link href="/lobby"><a style={{color:blue}}>back</a></Link></h5>
    </div>
  )
}
