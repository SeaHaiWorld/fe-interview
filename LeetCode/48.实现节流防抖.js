function debounce(func, waitTime) {
    let timer = null
    return function() {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func.call(this, arguments)
        }, waitTime)
    }
}

function throttle(func, wait) {
    let lastTime = 0;
    return function() {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            func.call(this, arguments);
        }
    };
}
