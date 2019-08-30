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
			const currentRecents = [...state.recentSearches.terms];
			let newRecent;
			if (currentRecents.length === 6) {
				const sliced = currentRecents.slice(0, 5);
				newRecent = [action.payload.term, ...sliced];
			} else {
				newRecent = [action.payload.term, ...currentRecents]
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
				recent = JSON.parse(localStorage.getItem(RECENTS_KEY));
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
