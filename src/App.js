import React, {useEffect} from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TrackListContainer from "./containers/TrackListContainer";
import CurrentTrackContainer from "./containers/CurrentTrackContainer";
import RecentSearchesContainer from "./containers/RecentSearchesContainer";
import {connect} from "react-redux";
import {loadRecent} from "./store/actionCreators";

function App({tracks, searchTrack, loadRecent, recentSearches}) {
	useEffect(() => {
		loadRecent();
	}, [loadRecent]);

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
						<TrackListContainer />
					</div>
					<CurrentTrackContainer/>
					<RecentSearchesContainer terms={recentSearches}/>
				</div>
			</>
	);
}

const mapStateToProps = (state) => ({
	recentSearches: state.recentSearches.terms
});

const mapDispatchToProps = (dispatch) => ({
	loadRecent: () => {
		dispatch(loadRecent())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
