import React, { Component } from 'react';
import {
	Grid,
	IconButton,
	MenuItem,
	Select,
	Typography,
	Box,
	Button,
	Card,
	CardActions,
	CardContent
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const styles = {
    fab: {
      position: "fixed",
      bottom: "3rem",
      right: "3rem",
    },
    card: {
      margin: "1rem",
      width: "16rem",
    },
    cardContent: {
      minHeight: "8rem",
    },
    cardActions: {
      height: "3rem",
    },
    iconButton: {
      marginLeft: "auto",
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
    },
    expandMore: {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      padding: "0.5rem",
    },
    select: {
      width: "100%",
      height: "100%",
      opacity: "0",
      cursor: "pointer",
    },
  };

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		// const { note, deleteNote } = this.props;
		// const { open } = this.state;

		return (
			<Grid item>
				<Card style={styles.card}>
					<Box bgcolor={'info.main'}>
						<CardContent style={styles.cardContent}>
							<Typography color="textSecondary" gutterBottom>
                            {this.props.course.number}
							</Typography>
							<Typography variant="h5">Full-Stack JavaScript</Typography>
						</CardContent>
					</Box>
					<CardActions style={styles.cardActions}>
						<Button disabled>Fall 2021</Button>
						<IconButton style={styles.iconButton}>
							<ExpandMore style={styles.expandMore} />
							<Select style={styles.select} value={'enrolled'}>
								<MenuItem value="move" disabled>
									<Typography variant="body1">Move to...</Typography>
								</MenuItem>
								<MenuItem value="enrolled">
									<Typography variant="body1" onClick={() => changeStatus(note)}>Currently Enrolled</Typography>
								</MenuItem>
								<MenuItem value="interested">
									<Typography variant="body1">Want to Take</Typography>
								</MenuItem>
								<MenuItem value="taken">
									<Typography variant="body1">Already Took</Typography>
								</MenuItem>
								<MenuItem value="none">
									<Box fontStyle="italic">
										<Typography variant="body1">None</Typography>
									</Box>
								</MenuItem>
							</Select>
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		);
	}
}

export default Course;
