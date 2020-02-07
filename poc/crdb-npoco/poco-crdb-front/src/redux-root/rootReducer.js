import { combineReducers } from 'redux';
import { crudOps } from '../basic-crud/reducers';

const rootReducer = combineReducers({
    crudOps
});

export default rootReducer;