import React from "react";
import './TrackListContainer.css'
import Track from "../components/Track";
import TrackSearch from "../components/TrackSearch";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {addRecent, persistRecent, selectTrack} from "../store/actionCreators";
import {fetchTracks, nextPage} from "../store/actions";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
	progress: {
		alignSelf: 'center',
		marginTop: 50
	}
});

export const tracksPerPage = 6;

const TrackListContainer = ({tracks, searchTrack, playTrack, nextPage}) => {
	const classes = useStyles();

	const handleSearch = (value) => {
		searchTrack(value, tracksPerPage);
	};

	const handlePlay = (track) => {
		playTrack(track);
	};

	const handleNextPage = () => {
		nextPage();
	};

	return (
			<div className="track-list">
				<TrackSearch onSearch={handleSearch}/>
				{
					tracks.loading ?
							<CircularProgress className={classes.progress}/> :
							<div className="list-container">
								{
									tracks.tracks && tracks.tracks.map((t) => {
										return <Track key={t.id} track={t} onPlay={handlePlay}/>
									})
								}
								{
									tracks.nextPage &&
									<Tooltip title="Next Page" aria-label="add">
										<IconButton onClick={handleNextPage}>
											<NavigateNextIcon/>
										</IconButton>
									</Tooltip>
								}
							</div>
				}
			</div>
	);
};

const mapStateToProps = (state) => ({
	tracks: state.tracks
});

const mapDispatchToProps = (dispatch) => ({
	searchTrack: (term, tracksPerPage) => {
		dispatch(addRecent(term));
		dispatch(persistRecent());
		dispatch(fetchTracks(term, tracksPerPage))
	},
	playTrack: (track) => {
		dispatch(selectTrack(track));
	},
	nextPage: () => {
		dispatch(nextPage())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
