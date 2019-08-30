import * as actionTypes from './actionTypes';
import {RECENTS_KEY} from "./recentsMiddleware";


const initialState = {
	tracks: {
		tracks: [],
		loading: false
	},
	recentSearches: {
		terms: []
	},
	currentTrack: {
		track: null,
		loading: false
	}
};


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRACKS_LOADING: {
			return {
				...state,
				tracks: {
					tracks: [],
					loading: true
				}
			}
		}
		case actionTypes.FETCH_TRACKS_SUCCESS: {
			return {
				...state,
				tracks: {
					tracks: action.payload.tracks,
					loading: false
				}
			}
		}
		case actionTypes.ADD_RECENT: {
			const currentRecent = [...state.recentSearches.terms];
			let newRecent;
			if (currentRecent.length === 5) {
				const sliced = currentRecent.slice(0, 4);
				newRecent = [action.payload.term, ...sliced];
			} else {
				newRecent = [action.payload.term, ...currentRecent]
			}

			return {
				...state,
				recentSearches: {
					terms: newRecent
				}
			}
		}
		case actionTypes.LOAD_RECENT: {
			let recent;

			try {
				const data = JSON.parse(localStorage.getItem(RECENTS_KEY));
				if (data)
					recent = data;
				else
					recent = [];
			} catch {
				recent = [];
			}

			return {
				...state,
				recentSearches: {
					terms: recent
				}
			}
		}
		default:
			return state;

	}
};

export default reducer;
