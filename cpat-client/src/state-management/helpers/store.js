import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { company } from '../company/reducers';
import { device } from '../device/reducers';
import { location } from '../location/reducers';
import { person } from '../person/reducers';
import { target } from '../target/reducers';
import { scriptsTest } from '../scripts-test/reducers';
import { search } from '../search/reducers';

const loggerMiddleware = createLogger();
const rootReducer = combineReducers({
    company,
    device,
    location,
    person,
    target,
    scriptsTest,
    search
});

export const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);