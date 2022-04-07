import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = {
	card: {
		margin: '1rem',
		width: '16rem'
	},
	cardContent: {
		minHeight: '8rem'
	},
	cardActions: {
		height: '3rem'
	},
	iconButton: {
		marginLeft: 'auto',
		width: '3rem',
		height: '3rem',
		borderRadius: '50%'
	},
	expandMore: {
		position: 'absolute',
		left: '0',
		top: '0',
		width: '100%',
		height: '100%',
		padding: '0.5rem'
	},
	select: {
		width: '100%',
		height: '100%',
		opacity: '0',
		cursor: 'pointer'
	}
};

class Course extends React.Component {
	render() {
		return (
			<Grid item>
				<Card style={styles.card}>
					<Box
						bgcolor={
							this.props.course.status === 'taken' ? (
								'success.main'
							) : this.props.course.status === 'enrolled' ? (
								'info.main'
							) : (
								'warning.main'
							)
						}
					>
						<CardContent style={styles.cardContent}>
							<Typography color="textSecondary" gutterBottom>
								{this.props.course.number}
							</Typography>
							<Typography variant="h5">{this.props.course.title}</Typography>
						</CardContent>
					</Box>
					<CardActions style={styles.cardActions}>
						<Button disabled>{this.props.course.term}</Button>
						<IconButton style={styles.iconButton}>
							<ExpandMore style={styles.expandMore} />
							<Select style={styles.select} value={this.props.course.status}>
								<MenuItem value="move" disabled>
									<Typography variant="body1">Move to...</Typography>
								</MenuItem>
								<MenuItem value="enrolled">
									<Typography
										variant="body1"
										onClick={this.props.updateStatus(this.props.course, 'enrolled')}
									>
										Currently Enrolled
									</Typography>
								</MenuItem>
								<MenuItem value="interested">
									<Typography
										variant="body1"
										onClick={this.props.updateStatus(this.props.course, 'interested')}
									>
										Want to Take
									</Typography>
								</MenuItem>
								<MenuItem value="taken">
									<Typography
										variant="body1"
										onClick={this.props.updateStatus(this.props.course, 'taken')}
									>
										Already Took
									</Typography>
								</MenuItem>
								<MenuItem value="none">
									<Box fontStyle="italic">
										<Typography
											variant="body1"
											onClick={this.props.updateStatus(this.props.course, 'none')}
										>
											None
										</Typography>
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
