import { createBrowserHistory, createMemoryHistory } from 'history';
import { config } from './config';
import { History } from 'history';
export const history: History = config.isBrowser ?
    createBrowserHistory({
        basename: '/'
    }) :
    createMemoryHistory();
export const getHistory = ({ basename }) => {
    return config.isBrowser ?
        createBrowserHistory({
            basename: basename || '/'
        }) :
        createMemoryHistory();
}