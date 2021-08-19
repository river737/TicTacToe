import style from '../../../styles/Choose/choose.module.css'
export default function Choose({symb, thissymb}) {
  return (
    <div className={style.page}>
       <h1>Pick one</h1>
       <button onClick={()=>thissymb('x')}>x</button>
       <button onClick={()=>thissymb('o')}>o</button>
    </div>
  )
}
