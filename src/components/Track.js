import React from "react";
import './Track.css';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

const defaultImage = 'https://via.placeholder.com/100?text=No+Image';

const useStyles = makeStyles({
	title: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center'
	}
});

const Track = ({track}) => {
	const classes = useStyles();
	return (
			<div className="track-container">
				<img src={track.artwork_url || defaultImage} width="100" height="100"/>
				<Typography variant="h5" className={classes.title}>
					{track.title}
				</Typography>
			</div>
	);
};

export default Track;
