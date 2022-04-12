import DisplayCourses from './pages/DisplayCourses.js';
import UpsertCourse from './pages/UpsertCourse';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';
import React from 'react';
import { create, getAll, remove, update } from './services/api.js';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedCourses: [],
			courses: []
		};
	}

	componentDidMount() {
		this.callAPI();
	}

	updateCourses = (courses) => {
		this.setState({
			courses: this.getAllStatus(this.state.selectedCourses, courses)
		});
	};

	callAPI = () => {
		getAll().then((data) => {
			this.setState({
				selectedCourses: data,
				courses: this.getAllStatus(data, this.state.courses)
			});
		});
	};

	getAllStatus = (selectedCourses, courses) => {
		return courses.map((course, index) => {
			let match = selectedCourses.find(
				(check) => check.number === course.number && check.title === course.title && check.term === course.term
			);
			if (!match) {
				return { ...course, status: 'none' };
			}
			return match;
		});
	};

	updateStatus = (course, newStatus) => {
		return () => {
			if (newStatus !== course.status) {
				if (course.status === 'none') {
					course.status = newStatus;
					create(course).then(this.callAPI);
				} else if (newStatus === 'none') {
					remove(course).then(this.callAPI);
				} else {
					update(course, newStatus).then(this.callAPI);
				}
			}
		};
	};

	render() {
		return (
			<Container>
				<Switch>
					<Route exact path="/">
						<DisplayCourses courses={this.state.selectedCourses} updateStatus={this.updateStatus} />
					</Route>

					<Route exact path="/search">
						<UpsertCourse
							courses={this.state.courses}
							updateStatus={this.updateStatus}
							updateCourses={this.updateCourses}
						/>
					</Route>

					<Route>
						<Container>
							<Typography> 404 - Not Found! ＞ˍ＜ </Typography>
							<Link to="/"> Back to Homepage</Link>
						</Container>
					</Route>
				</Switch>
			</Container>
		);
	}
}

export default App;
