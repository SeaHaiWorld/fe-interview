const deepCopyDfs = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    let copy = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnproperty(key)) {
            copy[key] = deepCopyDfs(obj[key])
        }
    }

    return obj


}

const deepCopyBfs = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let copy = Array.isArray(obj) ? [] : {};
    let queue = [{ original: obj, copy: copy }];
    let visited = new Set(); // 用于记录已经访问过的对象，避免重复访问

    while (queue.length > 0) {
        const { original, copy } = queue.shift() as  { original: any, copy: any };

        for (let key in original) {
            if (original.hasOwnProperty(key)) {
                if (typeof original[key] === 'object' && original[key] !== null) {
                    if (!visited.has(original[key])) {
                        copy[key] = Array.isArray(original[key]) ? [] : {};
                        queue.push({ original: original[key], copy: copy[key] });
                        visited.add(original[key]);
                    } else {
                        // 如果已经访问过这个对象，则直接复制其引用
                        copy[key] = original[key];
                    }
                } else {
                    copy[key] = original[key];
                }
            }
        }
    }

    return copy;
};

// Example usage:
const originalObj = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const copiedObj = deepCopyBfs(originalObj);
console.log(copiedObj);

// 修改原始对象的属性值
originalObj.address.city = 'Los Angeles';
console.log(originalObj);
console.log(copiedObj); // 拷贝的对象不受原始对象修改的影响
