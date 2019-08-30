import React from "react";
import './TrackListContainer.css'
import Track from "../components/Track";

const TrackListContainer = ({tracks}) => {
	return (
			<div className="list-container">
				{tracks && tracks.map((t) => {
					return <Track key={t.id} track={t}/>
				})}
			</div>
	);
};

export default TrackListContainer;
