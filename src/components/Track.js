import React from "react";
import './Track.css';
import Typography from "@material-ui/core/Typography";

const defaultImage = 'https://via.placeholder.com/100?text=No+Image';

const Track = ({track, onPlay}) => {
	return (
			<div className="track-container" onClick={() => {onPlay(track)}}>
				<img src={track.artwork_url || defaultImage} width="100" height="100" alt="track art"/>
				<div className="track-details">
					<Typography variant="h5">
						{track.title}
					</Typography>
					<Typography variant="subtitle1">
						{track.genre}
					</Typography>
				</div>
			</div>
	);
};

export default Track;
