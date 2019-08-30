import React from "react";
import {connect} from "react-redux";

const CurrentTrackContainer = ({selectedTrack}) => {
	return (
			selectedTrack ? <span>{selectedTrack.title}</span> : <span>No Track</span>
	);
};

const mapStateToProps = (state) => ({
	selectedTrack: state.currentTrack.track
});

export default connect(mapStateToProps)(CurrentTrackContainer);
