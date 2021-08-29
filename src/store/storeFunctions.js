import store from 'store-js'

function getTarget({name='', keys=[]}) {
    const data = store.get(name)
    let target = data
    keys.forEach(val => target = target[val])
    return {data, target}
}

function getObjectTarget({name='', keys=[]}) {
    const end = keys.length-1
    const obj = getTarget({name, keys: keys.slice(0, end)})
    obj.end = end
    return obj
}

export const storeArray = {
    update({name ='', keys=[], type='' || 'push', value=[]}) {
        const {data, target} = getTarget({name, keys})
        target[type](...value) // expand the value array into function arguments
        
        store.set(name, data)
        return {success: true, data}
    },
    delete({name='', keys=[], value=[]}) {
        // any elements in the data array that equal any elements of the value array will be deleted
        const {data, target} = getTarget({name, keys})
        let deleted = false
        value.forEach(val => {
            const ind = target.indexOf(val)
            if(val>=0) {
                deleted = true
                target.splice(ind, 1)
            }
        })
        if(deleted) store.set(name, data)
        return {success: deleted, data}
    }
}

export const storeObject = {
    update({name='', keys=[], value}) {
        let {data, target, end} = getObjectTarget({name, keys})
        
        target[keys[end]]= value
        store.set(name, data)
        return {success: true, data}
    },
    delete({name= '', keys=[]}) {
        let deleted = false
        let {data, target, end} = getObjectTarget({name, keys})

        if(target[keys[end]]) {
            deleted = true
            delete target[keys[end]]
        }
        if(deleted) store.set(name, data)
        return {success: deleted, data}
    }
}