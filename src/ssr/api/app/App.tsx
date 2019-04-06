import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from "react-router";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
// import '../style.scss';

import Homepage from './Homepage';

const Homepage1 = Loadable({
    loader: () => import('./Homepage1'),
    modules: ['./Homepage1'],
    loading: () => <div>Loading...</div>,
});
const Homepage2 = Loadable({
    loader: () => import('./Homepage2'),
    modules: ['./Homepage2'],
    loading: () => <div>Loading...</div>,
});
export const App = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <React.Fragment>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/homepage1' component={Homepage1} />
                <Route exact path='/homepage2' component={Homepage2} />
            </React.Fragment>
        </ConnectedRouter>
    </Provider>
)
export default hot(module)(App);