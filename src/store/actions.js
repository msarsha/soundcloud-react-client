import * as actionCreators from './actionCreators'
import SC from "../soundcloud";

export const fetchTracks = (term, pageNumber, tracksPerPage) => async dispatch => {
	dispatch(actionCreators.tracksLoading());

	const {collection} = await SC.get('/tracks', {
		q: term,
		limit: tracksPerPage,
		linked_partitioning: pageNumber
	});

	dispatch(actionCreators.fetchTracksSuccess(collection));
};
