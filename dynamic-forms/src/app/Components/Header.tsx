import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Header: React.FC<{
  showLogout: boolean;
  doLogout: () => void;
}> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <AppBar color="secondary" position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Revest Dynamic Forms
          </Typography>
          {props.showLogout && (
            <Button onClick={props.doLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
