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
		track: null
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
				recent = data || [];
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
		case actionTypes.SELECT_TRACK: {
			return {
				...state,
				currentTrack: {
					track: action.payload.track
				}
			}
		}
		default:
			return state;

	}
};

export default reducer;
