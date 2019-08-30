import React from "react";
import {connect} from "react-redux";

const RecentSearchesContainer = ({terms}) => {
	return (
			<ul>
				{terms.map((t, i) => <li key={i}>{t}</li>)}
			</ul>
	);
};

const mapStateToProps = (state) => ({
	terms: state.recentSearches.terms
});

export default connect(mapStateToProps)(RecentSearchesContainer);
