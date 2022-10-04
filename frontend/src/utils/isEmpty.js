

export function arrIsEmpty(array) {
    return (!array || array.length === 0);
}

export function strIsEmpty(string) {
    return (!string || string === '');
}

export function obgIsEmpty(object) {
    for (const key in object) {
        return false;
    }
    return true;
}