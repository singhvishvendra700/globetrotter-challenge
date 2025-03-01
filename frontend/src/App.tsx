import { Box } from "@mui/material";
import PlayScreen from "./components/play-screen/play-screen";
import "./app.css";

function App() {
  return (
    <Box className="app-container" data-testid="app-cotainer">
      <PlayScreen />
    </Box>
  );
}

export default App;
