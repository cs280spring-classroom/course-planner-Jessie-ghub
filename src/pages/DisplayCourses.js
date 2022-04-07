import React from "react";
import Header from "../components/Header.js";
import { Link } from "react-router-dom";
import CourseBlock from "../components/CourseBlock.js";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  },
};

class DisplayCourses extends React.Component {

    pickCourses = (status) => {
        return (
            this.props.courses.filter(
                (course) => course.status === status)
        );
    };

  render() {
    return (
      <>
        <Header />
        <CourseBlock
          updateStatus={this.props.updateStatus}
          category="Currently Enrolled"
          courses={this.pickCourses("enrolled")}
        />

        <CourseBlock
          updateStatus={this.props.updateStatus}
          category="Want to Take"
          courses={this.pickCourses("interested")}
        />

        <CourseBlock
          updateStatus={this.props.updateStatus}
          category="Already Took"
          courses={this.pickCourses("taken")}
        />

        <Link to="/search">
          <Fab style={styles.fab} color="primary">
            <Add />
          </Fab>
        </Link>
      </>
    );
  }
}

export default DisplayCourses;


