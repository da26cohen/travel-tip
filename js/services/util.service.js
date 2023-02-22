export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getRandomIntInclusive,
    getCurrentDate,
    getShortedNum,
    setQueryParams,
    deleteQueryParam,
    getValFromParam
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
    let txt = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function setQueryParams(newParams) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    for (var paramName in newParams) {
        const paramValue = newParams[paramName];
        params.set(paramName, paramValue); // used to update an existing query string parameter or add a new one if it doesn't exist.
    }

    url.search = params.toString();
    window.history.pushState({ path: url.href }, '', url.href); //modify the URL of the current page without reloading the page
}

function deleteQueryParam(key) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.delete(key);
    url.search = params.toString();

    window.history.pushState({ path: url.href }, '', url.href);
}

function getValFromParam(key) {
    const queryStringParams = new URLSearchParams(window.location.search);
    return queryStringParams.get(key);
}



function getCurrentDate() {
    let date = new Date();
    let time = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jerusalem'
    }
    let timeString = date.toLocaleTimeString('en-US', time);
    let dateString = date.toLocaleDateString() + ' ' + timeString;
    return dateString;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getShortedNum(num) {
    num *= 1000
    num = parseInt(num)
    return num / 1000
}