import styles from '../../../../../styles/lobby/body/tutorial/Tutorial.module.css'
import {useState, useRef, useEffect} from 'react';
export default function Tutorial({setTutorial}) {
  const [num, setNum] = useState(0);
  const box = useRef();
  let content = {
    content0: 'Each player begins with x or o',
    content1: 'Each player will take turns for each symbol the player marks',
    content2: 'The block that has been marked cannot be changed',
    content3: 'The first player to make a row of 5 same symbols or a column of 5 same symbols or a diagonal of 5 same symbols wins',
    content4: 'You can play with bot to practice or play an online match with a random player or with your friends',
  }

  useEffect(()=>{
    box.current.children[num].style.background='blue';
    Object.keys(box.current.children).filter(x => parseInt(x)!== num).forEach(i => box.current.children[parseInt(i)].style.background='none');
  }, [num])
  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={()=>setTutorial(false)}><i class="fas fa-arrow-left fa-2x"></i></button>
      <div className={styles.content}>
          <h1>How to play <i class="fas fa-gamepad"></i></h1>
          <h3>{content[`content${num}`]}</h3>
          <div ref={box}>
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
            <div className={styles.box3}></div>
            <div className={styles.box4}></div>
            <div className={styles.box5}></div>
          </div>
      </div>
      <button className={styles.boxright} onClick={()=>setNum(num+1>4?num:num+1)}>
        <i class="fas fa-chevron-right fa-3x"></i>
      </button>
      <button className={styles.boxleft} onClick={()=>setNum(num-1<0?num:num-1)}>
        <i class="fas fa-chevron-left fa-3x"></i>
      </button>
    </div>
  )
}
