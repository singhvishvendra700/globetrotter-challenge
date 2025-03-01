import { useEffect } from "react";
import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useChallengeFriend } from "./hooks";

export default function ChallengeFriend({
  username,
}: {
  username: string | null;
}) {
  const {
    inviteLink,
    generatedImage,
    imageRef,
    showAlert,
    handleChallenge,
    copyToClipboard,
    shareOnWhatsApp,
  } = useChallengeFriend(username ? { username } : { username: null });

  useEffect(() => {
    handleChallenge();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        bgcolor: "background.paper",
        borderRadius: "12px",
        textAlign: "center",
        margin: "auto",
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 2,
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        Challenge a Friend 🎉
      </Typography>
      <Box
        mt={2}
        sx={{
          width: "100%",
          minHeight: "200px",
          backgroundColor: "white",
        }}
      >
        {generatedImage && (
          <img
            src={generatedImage}
            alt="Invite Preview"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Box>
      <Box
        ref={imageRef}
        sx={{
          bgcolor: "#f9f9f9",
          p: 2,
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: 1,
        }}
      >
        <Typography variant="caption" color="success">
          Copy the below URL or share on WhatsApp
        </Typography>

        {inviteLink && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              bgcolor: "white",
              p: 1,
              borderRadius: "6px",
              boxShadow: 1,
            }}
          >
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {inviteLink}
            </Typography>

            <Tooltip title={!showAlert && "Copy link"}>
              {showAlert ? (
                <IconButton sx={{ ml: 1 }}>
                  <DoneIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton onClick={copyToClipboard} sx={{ ml: 1 }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              )}
            </Tooltip>
          </Box>
        )}
      </Box>

      <Button
        onClick={shareOnWhatsApp}
        variant="contained"
        sx={{ mt: 2, width: "100%", textTransform: "none" }}
      >
        Share on WhatsApp 🚀
      </Button>
    </Box>
  );
}
