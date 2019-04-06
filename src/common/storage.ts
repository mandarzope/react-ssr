let _Storage = {
    getItem: (k) => null,
    setItem: (k, v) => null,
    removeItem: (k) => null
}
let _localStorage = _Storage;
let _sessionStorage = _Storage;
if (typeof window !== 'undefined' && window && window.localStorage) {
    _localStorage = window.localStorage
}
if (typeof window !== 'undefined' && window && window.sessionStorage) {
    _sessionStorage = window.sessionStorage
}


export const localStorage = _localStorage;
export const sessionStorage = _sessionStorage;