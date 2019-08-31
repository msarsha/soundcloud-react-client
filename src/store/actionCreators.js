import * as actionTypes from './actionTypes';
import {CHANGE_LAYOUT} from "./actionTypes";
import {LOAD_LAYOUT} from "./actionTypes";

export const fetchTracksSuccess = (tracks, term, nextPage = null) => ({
	type: actionTypes.FETCH_TRACKS_SUCCESS,
	payload: {
		tracks,
		term,
		nextPage
	}
});

export const tracksLoading = () => ({
	type: actionTypes.TRACKS_LOADING
});


export const addRecent = (term) => ({
	type: actionTypes.ADD_RECENT,
	payload: {
		term: {
			term,
			timestamp: new Date()
		}
	}
});

export const persistRecent = (recentSearches) => ({
	type: actionTypes.PERSIST_RECENT,
	payload: {
		terms: recentSearches
	}
});

export const loadRecent = () => ({
	type: actionTypes.LOAD_RECENT
});

export const selectTrack = (track) => ({
	type: actionTypes.SELECT_TRACK,
	payload: {
		track
	}
});

export const changeLayout = (layout) => ({
	type: CHANGE_LAYOUT,
	payload: {
		layout
	}
});

export const loadLayout = () => ({
	type: LOAD_LAYOUT
});
