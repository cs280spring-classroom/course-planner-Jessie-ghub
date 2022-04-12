import DisplayCourses from './pages/DisplayCourses.js';
import UpsertCourse from './pages/UpsertCourse';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';
import React from 'react';
import { create, getAll, remove, update } from './services/api.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedCourses: [],
			courses: []
		};
	}

	componentDidMount() {
		this.updateSelectedCourses();
	}

	updateCourses = (courses) => {
		this.setState({
			courses: this.filterCourses(this.state.selectedCourses, courses)
		});
	};

	updateSelectedCourses = () => {
		getAll().then((data) => {
			this.setState({
				selectedCourses: data,
				courses: this.filterCourses(data, this.state.courses)
			});
		});
	};

	filterCourses = (selectedCourses, courses) => {
		return courses.map((course) => {
			let match = selectedCourses.find(
				(check) => check.number === course.number && check.title === course.title && check.term === course.term
			);
			if (match === undefined) {
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
					create(course).then(this.updateSelectedCourses);
				} else if (newStatus === 'none') {
					remove(course).then(this.updateSelectedCourses);
				} else {
					update(course, newStatus).then(this.updateSelectedCourses);
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
				</Switch>
			</Container>
		);
	}
}

export default App;
