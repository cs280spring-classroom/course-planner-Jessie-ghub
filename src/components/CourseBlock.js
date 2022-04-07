import Course from "./Course.js";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

class CourseBlock extends React.Component {
  render() {
    return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box py={2}>
            <Typography variant="h6">{this.props.category}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default CourseBlock;
