import { config } from '../../common/config';
import { configureStore } from '../../common/store';
import reducers from '../../common/reducers';
import { actionCreator } from '@/common/helpers';


const initialStateFromWindow = config.isBrowser ? window.__REDUX_STATE__ : {};
var sessionStore = {};
try {
    sessionStore = JSON.parse(sessionStorage.getItem('session:storage:store'));
} catch (e) {

}
const storeD = configureStore(reducers({
    // reducers
}), Object.assign({}, initialStateFromWindow, sessionStore));

storeD.dispatch({ type: 'SET_DEVICE' });
storeD.subscribe(() => {
    sessionStorage.setItem('session:storage:store', JSON.stringify(storeD.getState()))
})

export const store = storeD