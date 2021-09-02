import style from '../../../../styles/Choose/choose.module.css'
export default function Choose({thissymb, setMyturn, setBotturn}) {
  return (
    <div className={style.page}>
       <div className={style.box1}>
         <i className="fas fa-dice fa-3x"></i>
         <h1>You will begin first as x</h1>
         <button onClick={()=>thissymb('x')}>Choose x</button>
       </div>
       <div className={style.box2}>
         <i className="fas fa-dice fa-3x"></i>
         <h1>Bot will begin first as x</h1>
         <button onClick={()=>{thissymb('o'); setMyturn(false); setBotturn({turn: true, check: true});}}>Choose o</button>
       </div>
    </div>
  )
}
