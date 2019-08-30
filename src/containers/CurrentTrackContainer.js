import React from "react";
import './CurrentTrackContainer.css';
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {defaultImage} from "../components/Track";

const CurrentTrackContainer = ({selectedTrack}) => {

	const renderTrack = () => {
		return (
				<>
					<img className="track-art" src={selectedTrack.artwork_url || defaultImage} alt="selected track art"/>
					<Typography variant="h4">{selectedTrack.title}</Typography>
				</>
		);
	};

	return (
			<div className="current-track-container">
				{
					selectedTrack ?
							renderTrack() :
							<Typography variant="subtitle1">No Track Selected</Typography>
				}
			</div>
	);
};

const mapStateToProps = (state) => ({
	selectedTrack: state.currentTrack.track
});

export default connect(mapStateToProps)(CurrentTrackContainer);
