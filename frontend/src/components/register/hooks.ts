import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiUrls } from "../../config/config";
import { RegisterProps } from "../../interface/interface";

export const useRegister = ({ onRegister }: RegisterProps) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const score = useSelector((state: RootState) => state.game.score);

  const handleRegister = () => {
    if (!username.trim()) {
      setError("Username is required!");
      return;
    }

    axios
      .post(apiUrls().registerUser, { username, score })
      .then((_res) => {
        localStorage.setItem("username", username);
        onRegister(username);
        // `Welcome, ${username}! Your score: ${score}`
        setError(null);
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          console.error(err);
          setError("An error occurred. Please try again.");
        }
      });
  };

  return {
    username,
    setUsername,
    error,
    handleRegister,
  };
};
