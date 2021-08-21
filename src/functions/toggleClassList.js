export default function toggleClassList(node, classList=[]) {
    classList.forEach(val => {
        node?.classList.toggle(val)
    })
}