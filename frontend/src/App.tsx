import { Box } from "@mui/material";
import PlayScreen from "./components/play-screen/play-screen";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "Arial, sans-serif";

    return () => {
      document.body.style.margin = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  return (
    <Box className="app-container">
      <PlayScreen />
    </Box>
  );
}

export default App;
