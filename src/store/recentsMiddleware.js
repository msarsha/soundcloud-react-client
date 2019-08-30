import {PERSIST_RECENT} from "./actionTypes";

export const RECENTS_KEY = 'RECENTS';

const recentsMiddleware = store => next => action => {
	if (action.type === PERSIST_RECENT) {
		const {recentSearches} = store.getState();
		localStorage.setItem(RECENTS_KEY, JSON.stringify(recentSearches.terms));
	}

	next(action);
};

export default recentsMiddleware;
