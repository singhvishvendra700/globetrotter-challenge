import { Box, Modal, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChallengeFriend from "../challenge-friend/challenge-friend";
import Register from "../register/register";
import "./share.css";

interface ShareProps {
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  username: string | null;
  setUsername: (username: string) => void;
}

const Share = ({
  showShareModal,
  setShowShareModal,
  username,
  setUsername,
}: ShareProps) => {
  return (
    <Modal open={showShareModal} onClose={() => setShowShareModal(false)}>
      <Box className="share-modal-container">
        <Paper className="share-modal-paper">
          <IconButton
            className="share-modal-close-button"
            onClick={() => setShowShareModal(false)}
          >
            <CloseIcon />
          </IconButton>

          {username ? (
            <ChallengeFriend username={username} />
          ) : (
            <Register onRegister={setUsername} />
          )}
        </Paper>
      </Box>
    </Modal>
  );
};

export default Share;
