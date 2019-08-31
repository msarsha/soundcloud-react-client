import React from "react";
import './TrackListContainer.css'
import Track from "../components/Track";
import TrackSearch from "../components/TrackSearch";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {addRecent, changeLayout, persistRecent, selectTrack} from "../store/actionCreators";
import {fetchTracks, nextPage} from "../store/actions";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
	progress: {
		alignSelf: 'center',
		marginTop: 50
	}
});

export const tracksPerPage = 6;

const TrackListContainer = ({tracks, searchTrack, selectTrack, nextPage, changeLayout}) => {
	const classes = useStyles();

	const handleSearch = (value) => {
		searchTrack(value, tracksPerPage);
	};

	const handlePlay = (track) => {
		selectTrack(track);
	};

	const handleNextPage = () => {
		nextPage();
	};

	const handleLayoutChange = (layout) => {
		changeLayout(layout);
	};

	return (
			<div className="track-list">
				<TrackSearch onSearch={handleSearch}/>
				{
					tracks.loading ?
							<CircularProgress className={classes.progress}/> :
							<>
								<div className={'list-container ' + tracks.layout}>
									{
										tracks.tracks && tracks.tracks.map((t) => {
											return <Track key={t.id} track={t} onPlay={handlePlay} layout={tracks.layout}/>
										})
									}
								</div>
								<div className="track-list-control-panel">
									{
										tracks.nextPage &&
										<Tooltip title="Next Page" aria-label="add">
											<IconButton onClick={handleNextPage}>
												<NavigateNextIcon/>
											</IconButton>
										</Tooltip>
									}
									<div className="left-side">
										<Tooltip title="List View" aria-label="add">
											<IconButton onClick={() => {
												handleLayoutChange('list')
											}}>
												<ListIcon/>
											</IconButton>
										</Tooltip>
										<Tooltip title="Tile View" aria-label="add">
											<IconButton onClick={() => {
												handleLayoutChange('tile')
											}}>
												<DashboardIcon/>
											</IconButton>
										</Tooltip>
									</div>
								</div>
							</>
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
	selectTrack: (track) => {
		dispatch(selectTrack(track));
	},
	nextPage: () => {
		dispatch(nextPage())
	},
	changeLayout: (layout) => {
		dispatch(changeLayout(layout));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
