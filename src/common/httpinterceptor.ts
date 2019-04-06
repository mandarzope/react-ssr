import { localStorage } from "./storage";

const token = localStorage.getItem('arvi:ai:token');
const status = {
    gotToken: false,
    gettingToken: false,
    token: token
}

export default (input: Request | string, options: RequestInit, c?: AbortController) => {
    if (c)
        options.signal = c.signal;
    options.headers = options.headers || {};
    let domain = window.location.origin;
    options.headers['Accept'] = 'application/json, application/javascript, text/plain, text/html';
    options.headers['Access-Control-Allow-Origin'] = domain.toString();
    options.headers['Cache-Control'] = 'no-cache';
    // options.credentials = 'include';
    return getToken()
        .then((token) => {
            options.headers['Authorization'] = 'Bearer ' + token;
            return fetch(input, options).then(res => res.json());
        })
}
const tokenRequests = [];
const getToken = () => {
    return Promise.resolve('test-token')
}

const handleRepsonse = (res) => res.json()