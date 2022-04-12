import React from 'react';
import { search } from '../services/api.js';
import Search from '../components/Search.js';
import Course from '../components/Course.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
class UpsertCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			currentPage: 1,
			totalPageNum: 0
		};
	}

	updateQuery = (query) => {
		this.setState({ query: query });
		search(query, this.state.currentPage, 10).then((data) => {
			this.props.updateCourses(data.data);
			if (data.pagination.last) {
				this.setState({ totalPageNum: data.pagination.last });
			} else {
				this.setState({ totalPageNum: 0 });
			}
		});
	};

	updatePage = (event, pageNum) => {
		this.setState({ currentPage: pageNum }, () => this.updateQuery(this.state.query));
	};

	render() {
		return (
			<Container>
				<Search query={this.state.query} updateQuery={this.updateQuery} />
				<Box display="flex" justifyContent="center" alignItems="center" spacing={2}>
					<Box margin="16px auto">
						<Pagination
							size="large"
							page={this.state.currentPage}
							count={this.state.totalPageNum}
							onChange={this.updatePage}
						/>
					</Box>
				</Box>
				<Grid container direction="row" justifyContent="center" alignItems="center">
					{this.props.courses.map((course, index) => (
						<Course course={course} key={index} updateStatus={this.props.updateStatus} />
					))}
				</Grid>
			</Container>
		);
	}
}

export default UpsertCourse;
