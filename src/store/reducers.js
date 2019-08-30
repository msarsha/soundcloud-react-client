import * as actionTypes from './actionTypes';
import {RECENTS_KEY} from "./recentsMiddleware";


const initialState = {
	tracks: {
		tracks: [],
		loading: false
	},
	recentSearches: {
		terms: [],
		loading: false
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
			let newRecents;
			if (currentRecents.length === 6) {
				const sliced = currentRecents.slice(0, 5);
				newRecents = [action.payload.term, ...sliced];
			} else {
				newRecents = [action.payload.term, ...currentRecents]
			}

			return {
				...state,
				recentSearches: {
					terms: newRecents,
					loading: false
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
					terms: recent,
					loading: false
				}
			}
		}
		default:
			return state;

	}
};

export default reducer;
