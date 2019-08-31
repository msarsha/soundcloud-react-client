import * as actionCreators from './actionCreators'
import SC from "../soundcloud";
import {embedTrack} from "./actionCreators";

export const fetchTracks = (term, tracksPerPage) => async dispatch => {
	dispatch(actionCreators.tracksLoading());
	const {collection, next_href} = await SC.get('/tracks', {
		q: term,
		limit: tracksPerPage,
		linked_partitioning: 1
	});

	dispatch(actionCreators.fetchTracksSuccess(collection, term, next_href));
};

export const nextPage = () => async (dispatch, getState) => {
	const {tracks} = getState();

	dispatch(actionCreators.tracksLoading());

	const result = await fetch(tracks.nextPage);
	const {collection, next_href} = await result.json();

	dispatch(actionCreators.fetchTracksSuccess(collection, tracks.term, next_href));
};

export const playTrack = (track) => async dispatch => {
	// loading track
	const {html} = await SC.oEmbed(track.permalink_url, {auto_play: true});
	dispatch(embedTrack(html));
};
