import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box py={3}>
          <Typography variant="h4">Course Planner</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
