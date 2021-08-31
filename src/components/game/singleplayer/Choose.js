import style from '../../../../styles/Choose/choose.module.css'
export default function Choose({thissymb, setMyturn}) {
  return (
    <div className={style.page}>
       <div className={style.box1}>
         <i class="fas fa-dice fa-3x"></i>
         <h1>You will begin first as x</h1>
         <button onClick={()=>thissymb('x')}>Choose x</button>
       </div>
       <div className={style.box2}>
         <i class="fas fa-dice fa-3x"></i>
         <h1>Bot will begin first as x</h1>
         <button onClick={()=>{thissymb('o'); setMyturn(false);}}>Choose o</button>
       </div>
    </div>
  )
}
