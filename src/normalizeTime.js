const normalizeTime = (value) => {
    if (!value) {
        return value
    }
    var onlyNums = value.replace(/[^\d]/g, '')
    if (parseInt(onlyNums.slice(2, 4)) > 59) {
        onlyNums = onlyNums.slice(0,2) + "59" + onlyNums.slice(4,6)
    }
    if (parseInt(onlyNums.slice(4, 6)) > 59) {
        onlyNums = onlyNums.slice(0,2) + onlyNums.slice(2,4) + "59"
    }
    return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}:${onlyNums.slice(4, 6)}`
}

export default normalizeTime