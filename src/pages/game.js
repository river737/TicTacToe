import styles from '../../styles/Game.module.css'
import {InfoContext} from '../components/form.js'
import {useRouter} from 'next/router'
import {useState, useEffect, useContext, useReducer, useRef} from 'react'
import detector from '../gamelogic/rule.js'
import DisplayWinner from '../gamelogic/result.js'

function reducer(newarr, action) {
  switch(action.type) {
    case 'add':
      newarr[action.append.i][action.append.j].fill = action.symbol;
      return [...newarr];
    default:
       return [...newarr];
  }
}

export default function Game() {
  const {data, setData} = useContext(InfoContext);
  const router = useRouter();
  const [turn, setTurn] = useState('x');
  const wrapper = useRef();
  const gridwrapper = useRef();
  const [winner, setWinner] = useState(null);
  const size = 15, length = 50;
  let arr = [];
  for(let i = 0; i < size; i++) {
    arr[i] = new Array();
    for(let j = 0; j < size; j++) {
      arr[i][j] = {fill: ''};
    }
  }

  const [newarr, dispatch] = useReducer(reducer, arr);

  useEffect(() => {
    if(data.name==='') router.push('/');
  }, [data.name]);

  function display(i, j) {
    if(newarr[i][j].fill==='') {
      dispatch({type:'add', append:{i: i, j: j}, symbol:turn});
      setTurn(turn==='o' ? 'x':'o');
    }
  }

  function back() {
    router.push('/')
  }

  useEffect(()=>{
    const x = detector(newarr, size, gridwrapper.current.childNodes);
    if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
  }, [newarr]);

  return (
    <>
      <div className={styles.grid} ref={wrapper}>
        <div className={styles.box} ref={gridwrapper}>
        {
          newarr.map((items, i) => {
            return items.map((item, j) => {
              return <div className={styles.grids} key={i*size+j} onClick={() => display(i, j)}>{item.fill}</div>
            })
          }
          )
        }
        </div>
        <button onClick={back} className={styles.button}>Terminate game</button>
      </div>
      {(winner!==null) && <DisplayWinner passdata={{name: data.name, win: winner, setWin: setWinner}} />}
    </>
  )
}
