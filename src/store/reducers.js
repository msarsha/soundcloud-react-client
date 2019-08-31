import * as actionTypes from './actionTypes';
import {LAYOUT_KEY, RECENT_KEY} from "./localStorageMiddleware";


const initialState = {
	tracks: {
		tracks: [],
		term: '',
		loading: false,
		nextPage: null,
		layout: 'list'
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
					...state.tracks,
					tracks: [],
					term: '',
					loading: true
				}
			}
		}
		case actionTypes.FETCH_TRACKS_SUCCESS: {
			return {
				...state,
				tracks: {
					...state.tracks,
					tracks: action.payload.tracks,
					term: action.payload.term,
					loading: false,
					nextPage: action.payload.nextPage
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
				const data = JSON.parse(localStorage.getItem(RECENT_KEY));
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
		case actionTypes.CHANGE_LAYOUT: {
			return {
				...state,
				tracks: {
					...state.tracks,
					layout: action.payload.layout
				}
			}
		}
		case actionTypes.LOAD_LAYOUT: {
			const layout = JSON.parse(localStorage.getItem(LAYOUT_KEY)) || state.tracks.layout;

			return {
				...state,
				tracks: {
					...state.tracks,
					layout
				}
			}
		}
		default:
			return state;

	}
};

export default reducer;
