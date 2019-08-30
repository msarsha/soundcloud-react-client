import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {tracksPerPage} from "./TrackListContainer";
import {addRecent, persistRecent} from "../store/actionCreators";
import {fetchTracks} from "../store/actions";

const RecentSearchesContainer = ({terms, searchTrack}) => {
	const handleSearch = (value) => {
		searchTrack(value, 1, tracksPerPage);
	};

	return (
			<div>
				<Typography variant="h5">
					Recent Searches
				</Typography>
				<List>
					{terms && terms.map((t, i) => (
							<ListItem key={i} button onClick={() => {handleSearch(t.term)}}>
								<ListItemText
										primary={t.term}
										secondary={(new Date(t.timestamp).toLocaleString())}
								/>
							</ListItem>
					))}
				</List>
			</div>
	);
};

const mapStateToProps = (state) => ({
	terms: state.recentSearches.terms
});

const mapDispatchToProps = (dispatch) => ({
	searchTrack: (term, pageNumber, tracksPerPage) => {
		dispatch(fetchTracks(term, pageNumber, tracksPerPage))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentSearchesContainer);
