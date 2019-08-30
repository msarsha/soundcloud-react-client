import * as actionTypes from './actionTypes';

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
			return {
				...state,
				recentSearches: {
					terms: [action.payload.term, ...state.recentSearches.terms],
					loading: false
				}
			}
		}
		default:
			return state;

	}
};

export default reducer;
