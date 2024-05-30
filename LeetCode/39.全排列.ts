function permute(nums: number[]) {
    let res: number[][] = [];
    function backTrack(arr: number[], remaining: number[]) {
        if (remaining.length === 0) {
            res.push([...arr]); // 使用副本
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const newCurrent = [...arr, remaining[i]];
            const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
            backTrack(newCurrent, newRemaining);
        }
    }

    backTrack([], nums);
    return res;
}


function permuteArr(nums: number[]) {
    let res: number[][] = []

    function backTrack(arr: number[], remain: number[]) {
        if (remain.length === 0) {
            res.push([...arr])
        }

        for (let i = 0; i < remain.length; i++) {
            let newRemaining = [...remain.slice(0, i), ...remain.slice(i+1)]
            backTrack(arr.concat(remain[i]), newRemaining)
        }
    }

    backTrack([], nums)
    return res
}