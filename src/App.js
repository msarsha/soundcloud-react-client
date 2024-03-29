import React, {useEffect} from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TrackListContainer from "./containers/TrackListContainer";
import CurrentTrackContainer from "./containers/CurrentTrackContainer";
import RecentSearchesContainer from "./containers/RecentSearchesContainer";
import {connect} from "react-redux";
import {loadLayout, loadRecent} from "./store/actionCreators";

function App({loadData}) {
	useEffect(() => {
		loadData();
	}, [loadData]);

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
					<TrackListContainer/>
					<CurrentTrackContainer/>
					<RecentSearchesContainer/>
				</div>
			</>
	);
}

const mapDispatchToProps = (dispatch) => ({
	loadData: () => {
		dispatch(loadRecent());
		dispatch(loadLayout());
	}
});

export default connect(null, mapDispatchToProps)(App);
