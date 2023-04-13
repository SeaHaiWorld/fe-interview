/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
 var alertNames = function(keyName, keyTime) {
    if (!keyName.length) {
        return []
    }
    const getMinu = (v) => {
        const times = v.split(':') 
        return times[0]*60 + +times[1]
    }
    const times = keyTime.map(v => getMinu(v))
    const nameMap = new Map()
    let i = 0
    while (i < keyName.length) {
        if (nameMap.get(keyName[i])) {
            nameMap.get(keyName[i]).push(times[i])
        } else {
            nameMap.set(keyName[i],[times[i]])
        }
        i++
    }

    const nameRes = []
    const nameKeys = nameMap.keys()
    for (let key of nameKeys){
        const times = nameMap.get(key).sort((a, b) => a - b)
        let j = 0
        while (j < times.length - 2) {
            let time1 = times[j] 
            let time2 = times[j + 2] 
            if (time2 - time1 <= 60) {
                nameRes.push(key)
                break
            }
            j++
        }
    }
    return nameRes.sort()
};

// 优化版本
/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
 var alertNames = function(keyName, keyTime) {
    if (!keyName.length) {
        return []
    }
    const nameMap = new Map()
    let i = 0
    while (i < keyName.length) {
        const time = keyTime[i];
        const hour = (time[0].charCodeAt() - '0'.charCodeAt(0)) * 10 + (time[1].charCodeAt() - '0'.charCodeAt(0));
        const minute = (time[3].charCodeAt() - '0'.charCodeAt(0)) * 10 + (time[4].charCodeAt() - '0'.charCodeAt(0));
        if (nameMap.has(keyName[i])) {
            nameMap.get(keyName[i]).push(hour * 60 + minute);
        } else {
            nameMap.set(keyName[i],[hour * 60 + minute])
        }
        i++
    }

    const nameRes = []
    const nameKeys = nameMap.keys()
    for (let key of nameKeys){
        const times = nameMap.get(key).sort((a, b) => a - b)
        let j = 0
        while (j < times.length - 2) {
            let time1 = times[j] 
            let time2 = times[j + 2] 
            if (time2 - time1 <= 60) {
                nameRes.push(key)
                break
            }
            j++
        }
    }
    return nameRes.sort()
};