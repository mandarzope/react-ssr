///<reference path="../../../module.d.ts" />
import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
// import createRootReducer from '@/reducers';
import { config } from '../config';
import { history } from '../history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import window from 'global'

const RouterMiddleware = routerMiddleware(history);
const composeEnhancers = (
    config.isDevelopment &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
export function configureStore(createRootReducer, initialState?: any) {
    // configure middlewares
    const middlewares: any[] = [
        RouterMiddleware,
        thunk,
        // bikeService,
    ];
    // compose enhancers
    const enhancers = [applyMiddleware(...middlewares)].concat(
        // config.isDevelopment ? composeWithDevTools(DevTools.instrument()) : 
        []);
    const enhancer = composeEnhancers(...enhancers);
    // create store
    const storeWithHmr = createStore(
        createRootReducer(history),
        initialState,
        enhancer
    );
    // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            // const nextReducer = (require('./reducers') as { rootReducer: Reducer });
            storeWithHmr.replaceReducer(createRootReducer(history));
        });
    }

    return storeWithHmr;
}