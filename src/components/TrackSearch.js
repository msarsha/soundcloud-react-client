import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	input: {
		flex: 1,
		marginRight: 20
	},
	button: {
		padding: 15
	},
	container: {
		display: 'flex'
	}
}));

const TrackSearch = ({onSearch}) => {
	const [value, setValue] = useState('');
	const classes = useStyles();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (value)
			onSearch(value)
	};

	return (
			<form className={classes.container} onSubmit={handleSubmit} noValidate>
				<TextField
						required
						className={classes.input}
						placeholder="Search For Track..."
						value={value}
						onChange={(e) => {
							setValue(e.target.value)
						}}
						margin="none"
						variant="outlined"
				/>
				<Button variant="outlined" className={classes.button} onClick={handleSubmit}>
					Search
				</Button>
			</form>
	);
};

export default TrackSearch;
