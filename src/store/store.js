import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import localStorageMiddleware from "./localStorageMiddleware";

export default createStore(
		reducer,
		applyMiddleware(thunk, localStorageMiddleware)
);
