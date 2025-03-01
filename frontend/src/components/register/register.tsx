import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useRegister } from "./hooks";

export default function Register({
  onRegister,
}: {
  onRegister: (username: string) => void;
}) {
  const { username, setUsername, error, handleRegister } = useRegister({
    onRegister,
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        Create Your Account
      </Typography>
      <Typography
        sx={{
          mb: 3,
          fontSize: "10px",
          fontWeight: 300,
          color: "primary.main",
        }}
      >
        Enter a username to start sharing your score with your friends and
        invite them to play.
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Enter Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUsername(e.target.value)
          }
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error || ""}
          InputProps={{
            sx: { borderRadius: 1.5 },
          }}
          autoFocus
        />

        <Button
          variant="contained"
          onClick={handleRegister}
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)",
              transition: "all 0.3s",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
}
