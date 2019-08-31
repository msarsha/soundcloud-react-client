import React from "react";
import './CurrentTrackContainer.css';
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {defaultImage} from "../components/Track";
import {playTrack} from "../store/actions";

const CurrentTrackContainer = ({selectedTrack, playTrack}) => {

	const handlePlay = () => {
		playTrack(selectedTrack.track);
	};

	const createMarkup = () => {
		return {__html: selectedTrack.content};
	};

	const renderTrack = () => {
		return (
				<>
					<img className="track-art"
							 src={selectedTrack.track.artwork_url || defaultImage}
							 alt="selected track art"
							 onClick={handlePlay}
					/>
					<Typography variant="h4">{selectedTrack.track.title}</Typography>
					<Typography variant="subtitle1">{selectedTrack.track.genre}</Typography>
					{
						selectedTrack.content && <div className="embedded-container" dangerouslySetInnerHTML={createMarkup()}></div>
					}
				</>
		);
	};

	return (
			<div className="current-track-container">
				{
					selectedTrack.track ?
							renderTrack() :
							<Typography variant="subtitle1">No Track Selected</Typography>
				}
			</div>
	);
};

const mapStateToProps = (state) => ({
	selectedTrack: state.currentTrack
});

const mapDispatchToProps = (dispatch) => ({
	playTrack: (track) => {
		dispatch(playTrack(track));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTrackContainer);
