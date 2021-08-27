import styles from '../../../../styles/game/singleplayer/Sidebar.module.css'

import highlightGrid from '../../../functions/highlightGrid'

export default function Sidebar({grids, symb, setPage, botmove, gridwrapper, prevbot, size, prevplayer, dispatch}) {
    const highlight = ({index}) => {
        highlightGrid(gridwrapper.current.children[index], [styles.highlight])
    }
    function showhint() {
        const {i, j} = botmove(symb, grids, size, 'hint');
        highlight({index: (i*size)+j})
    }

    function lastmove() {
        const {i, j} = prevbot
        highlight({index: i*size + j})
    }

    function undo() {
        if(prevbot!==undefined && prevplayer!==undefined) {
            dispatch({type:'add', append: {i:prevbot.i, j:prevbot.j}, symbol: ''});
            dispatch({type:'add', append: {i:prevplayer.i, j:prevplayer.j}, symbol: ''});
        }
    }

    function back() {
        setPage({opened: false})
    }
    return (
        <div className={styles.wrapper}>
            <button onClick={showhint} className={styles.button}>Show hint</button>
            <button onClick={lastmove} className={styles.button}>Show last move</button>
            <button onClick={undo} className={styles.button}>Undo move</button>
            <button onClick={back} className={styles.button}>Terminate game</button>
        </div>
    )
}
