import {createStore,combineReducers} from 'redux'
import exam from './exam'
const reducers=combineReducers({
    exam,
})
 const Store=createStore(reducers)
 export default Store;
