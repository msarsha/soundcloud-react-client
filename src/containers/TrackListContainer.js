import React, {useState} from "react";
import './TrackListContainer.css'
import Track from "../components/Track";
import TrackSearch from "../components/TrackSearch";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {addRecent, persistRecent, selectTrack} from "../store/actionCreators";
import {fetchTracks} from "../store/actions";

const useStyles = makeStyles({
	progress: {
		alignSelf: 'center',
		marginTop: 50
	}
});

export const tracksPerPage = 6;

const TrackListContainer = ({tracks, searchTrack, playTrack}) => {
	const classes = useStyles();
	const [pageNumber, setPageNumber] = useState(1);

	const handleSearch = (value) => {
		searchTrack(value, pageNumber, tracksPerPage);
	};

	const handlePlay = (track) => {
		playTrack(track);
	};

	return (
			<div className="track-list">
				<TrackSearch onSearch={handleSearch}/>
				{
					tracks.loading ?
							<CircularProgress className={classes.progress}/> :
							<div className="list-container">
								{tracks.tracks && tracks.tracks.map((t) => {
									return <Track key={t.id} track={t} onPlay={handlePlay}/>
								})}
							</div>
				}
			</div>
	);
};

const mapStateToProps = (state) => ({
	tracks: state.tracks
});

const mapDispatchToProps = (dispatch) => ({
	searchTrack: (term, pageNumber, tracksPerPage) => {
		dispatch(addRecent(term));
		dispatch(persistRecent());
		dispatch(fetchTracks(term, pageNumber, tracksPerPage))
	},
	playTrack: (track) => {
		dispatch(selectTrack(track));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
