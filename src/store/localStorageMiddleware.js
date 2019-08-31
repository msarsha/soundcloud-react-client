import {CHANGE_LAYOUT, PERSIST_RECENT} from "./actionTypes";

export const RECENT_KEY = 'RECENTS';
export const LAYOUT_KEY = 'LAYOUT';

const localStorageMiddleware = store => next => action => {
	if (action.type === PERSIST_RECENT) {
		const {recentSearches} = store.getState();
		localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches.terms));
	} else if (action.type === CHANGE_LAYOUT) {
		localStorage.setItem(LAYOUT_KEY, JSON.stringify(action.payload.layout));
	}

	next(action);
};

export default localStorageMiddleware;
