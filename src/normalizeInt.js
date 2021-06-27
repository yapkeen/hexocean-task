const normalizeInt = (value) => {
    if (!value) {
        return value
    }
    var onlyNums = value.replace(/[^\d]/g, '')
    return `${onlyNums}`
}

export default normalizeInt