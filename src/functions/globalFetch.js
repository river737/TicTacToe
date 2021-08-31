export default async function globalFetch({query='', body, socketId, path=''})  {
    const obj = {socketId}
    if(body) obj.data = body
    try {
        const x = await fetch(`${path}?${query}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(obj)
        })
        const res = await x.json()

        return res
    }
    catch(err) {
        return {success: false}
    }
}