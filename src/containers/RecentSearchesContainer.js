import React from "react";

const RecentSearchesContainer = ({terms}) => {
	return (
			<ul>
				{terms.map((t, i) => <li key={i}>{t}</li>)}
			</ul>
	);
};

export default RecentSearchesContainer;
