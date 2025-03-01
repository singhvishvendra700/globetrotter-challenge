import { Box, Typography, Paper, IconButton } from "@mui/material";
import { HeaderProps } from "../../../interface/interface";
import "./header.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Header = ({ invitedUsername, inviteeScore }: HeaderProps) => {
  const [showModel, setShowModel] = useState(true);
  const onClose = () => {
    setShowModel(false);
  };
  return (
    <Box className="header-container">
      {showModel && invitedUsername && (
        <Paper elevation={2} className="header-banner">
          <IconButton className="close-button" onClick={onClose}>
            <CloseIcon sx={{ color: "black", fontSize: 20 }} />
          </IconButton>

          <Typography className="invited-username">
            🎉 <strong>{invitedUsername}</strong> challenged you!
            <br />
            <span className="score-text">
              Their score: {inviteeScore ?? "Loading..."}
            </span>
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Header;
