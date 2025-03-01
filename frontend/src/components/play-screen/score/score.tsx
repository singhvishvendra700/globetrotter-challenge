import { Typography, Box, Button, Paper } from "@mui/material";
import { ReplayOutlined } from "@mui/icons-material";

interface ScoreProps {
  score: number;
  fetchNewClue: () => void;
}

const Score = ({ score, fetchNewClue }: ScoreProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: "0.5px 10px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        width: "100%",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.3)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              mr: 2,
              p: 1,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
              boxShadow: "0 4px 12px rgba(255, 154, 158, 0.5)",
            }}
          >
            <Typography variant="h5" sx={{ lineHeight: 1 }}>
              🔥
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Score
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#2e7d32",
                textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {score}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={fetchNewClue}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            backgroundColor: "#3a7bd5",
            backgroundImage: "linear-gradient(to right, #3a7bd5, #3a6073)",
            boxShadow: "0 4px 12px rgba(58, 123, 213, 0.4)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(58, 123, 213, 0.6)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ReplayOutlined />
        </Button>
      </Box>
    </Paper>
  );
};

export default Score;
