import { Box, Typography, Button } from "@mui/material";
import { HeaderProps } from "../../../interface/interface";
import "./header.css";

const Header = ({
  username,
  setUsername,
  invitedUsername,
  inviteeScore,
}: HeaderProps) => {
  return (
    <Box className="header-container">
      {username && (
        <Box className="username-container">
          <Typography className="username-text">👤 {username}</Typography>
          <Button
            className="logout-button"
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem("username");
              setUsername(null);
            }}
          >
            Logout
          </Button>
        </Box>
      )}
      {invitedUsername && (
        <Typography className="invited-username">
          🎉 You were challenged by {invitedUsername}! Their score:{" "}
          {inviteeScore ?? "Loading..."}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
