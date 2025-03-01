import React from "react";
import { Box, Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { ShareButtonProps } from "../../../interface/interface";

const ShareButton: React.FC<ShareButtonProps> = ({ handleShare }) => {
  return (
    <Box sx={{ display: "flex", m: 1 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShare}
        sx={{
          borderRadius: 28,
          padding: "10px 24px",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-2px)",
            transition: "all 0.3s ease",
          },
        }}
        startIcon={<ShareIcon />}
      >
        Share with friends
      </Button>
    </Box>
  );
};

export default ShareButton;
