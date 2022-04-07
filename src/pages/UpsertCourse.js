import React from "react";
import { search } from "../services/api.js";
import Search from "../components/Search.js";
import Course from "../components/Course.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

class UpsertCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      page: 1,
      totalPages: 0,
    };
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    search(query, this.state.page, 9).then((data) => {
      this.props.updateCourses(data.data);
      this.setState({
        totalPages:
          data.pagination.last === undefined ? 0 : data.pagination.last,
      });
    });
  };

  render() {
    return (
      <Container>
        <Search query={this.state.query} updateQuery={this.updateQuery} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box margin="16px auto">
            <Pagination
              size="large"
              page={this.state.page}
              count={this.state.totalPages}
              onChange={this.pageUpdate}
            />
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {this.props.courses.map((course, key) => (
            <Course
              course={course}
              updateStatus={this.props.updateStatus}
              key={key}
            />
          ))}
        </Grid>
      </Container>
    );
  }

  pageUpdate = (event, value) => {
    this.setState({ page: value }, () => this.updateQuery(this.state.query));
  };
}

export default UpsertCourse;
