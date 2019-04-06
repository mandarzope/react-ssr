import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { history, getHistory } from '../../common/history';
import App from "./app/App";
import { store } from './store';
// import * as sW from "./serviceWorker";
import Loadable from 'react-loadable';

window['main'] = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <App
                store={store}
                history={getHistory({ basename })}
            />,
            document.getElementById("root")
        );
    })
}
// sW.register({});