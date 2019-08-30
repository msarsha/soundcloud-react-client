import React, {useEffect, useState} from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TrackListContainer from "./containers/TrackListContainer";
import CurrentTrackContainer from "./containers/CurrentTrackContainer";
import RecentSearchesContainer from "./containers/RecentSearchesContainer";
import TrackSearch from "./components/TrackSearch";
import {connect} from "react-redux";
import {fetchTracks} from "./store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core";
import {addRecent, persistRecent, loadRecent} from "./store/actionCreators";

const useStyles = makeStyles({
	progress: {
		alignSelf: 'center',
		marginTop: 50
	}
});

const tracksPerPage = 6;

function App({tracks, searchTrack, loadRecent, recentSearches}) {
	const classes = useStyles();
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		loadRecent();
	}, [loadRecent]);

	const handleSearch = (value) => {
		searchTrack(value, pageNumber, tracksPerPage);
	};

	return (
			<>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							Edea Soundcloud Player
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="content">
					<div className="track-list">
						<TrackSearch onSearch={handleSearch}/>
						{tracks.loading ?
								<CircularProgress className={classes.progress}/> :
								<TrackListContainer tracks={tracks.tracks}/>}
					</div>
					<CurrentTrackContainer/>
					<RecentSearchesContainer terms={recentSearches}/>
				</div>
			</>
	);
}

const mapStateToProps = (state) => ({
	tracks: state.tracks,
	recentSearches: state.recentSearches.terms
});

const mapDispatchToProps = (dispatch) => ({
	searchTrack: (term, pageNumber, tracksPerPage) => {
		dispatch(addRecent(term));
		dispatch(persistRecent());
		dispatch(fetchTracks(term, pageNumber, tracksPerPage))
	},
	loadRecent: () => {
		dispatch(loadRecent())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
