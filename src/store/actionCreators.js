import * as actionTypes from './actionTypes';

export const fetchTracks = () => ({
	type: actionTypes.FETCH_TRACKS
});

export const fetchTracksSuccess = (tracks) => ({
	type: actionTypes.FETCH_TRACKS_SUCCESS,
	payload: {
		tracks: tracks
	}
});

export const tracksLoading = () => ({
	type: actionTypes.TRACKS_LOADING
});

export const addRecent = (term) => ({
	type: actionTypes.ADD_RECENT,
	payload: {
		term
	}
});
