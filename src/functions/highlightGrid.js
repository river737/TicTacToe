import toggleClassList from "./toggleClassList";

export default function highlightGrid(node, classList=[], time=1000) {
    toggleClassList(node, classList)
    setTimeout(()=>{
        toggleClassList(node, classList)
    }, [time])
}