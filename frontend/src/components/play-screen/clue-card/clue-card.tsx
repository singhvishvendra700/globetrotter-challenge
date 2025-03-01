import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Typography, Card, CardContent, Box } from "@mui/material";
import { ClueCardProps } from "../../../interface/interface";
import Score from "../score/score";
import ShareButton from "../share/share-button";
import "./clue-card.css";

const ClueCard = ({
  clue,
  selectedAnswer,
  isCorrect,
  handleAnswerClick,
  feedback,
  score,
  fetchNewClue,
  handleShare,
}: ClueCardProps) => {
  const [hintIndex, setHintIndex] = useState(0);

  if (!clue) {
    return (
      <Typography color="error">Clue data is missing or not loaded.</Typography>
    );
  }

  const showNextHint = () => {
    if (hintIndex < clue.clues.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };
  return (
    <div className="container">
      <ShareButton handleShare={handleShare} />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card
          sx={{
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: 5,
            background: "linear-gradient(to bottom right, #4c6ef5, #9c55e0)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            width: "100%",
          }}
        >
          <div className="top-container" />

          <CardContent>
            <Box sx={{ mb: 2, position: "relative" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="caption"
                  color="white"
                  sx={{ opacity: 0.7 }}
                >
                  CLUE {hintIndex + 1}/{clue.clues.length}
                </Typography>
                {clue.clues.length > 1 && (
                  <Button
                    onClick={showNextHint}
                    disabled={
                      hintIndex === clue.clues.length - 1 || !!selectedAnswer
                    }
                    sx={{
                      color: "white",
                      opacity: 0.7,
                      "&:hover": { color: "white" },
                      "&:disabled": { opacity: 0.5 },
                    }}
                  >
                    Next hint →
                  </Button>
                )}
              </Box>

              <AnimatePresence mode="wait">
                <motion.div
                  key={hintIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ marginTop: 2 }}
                >
                  <Typography
                    variant="h5"
                    color="white"
                    sx={{ fontWeight: "bold" }}
                  >
                    {clue.clues[hintIndex]}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="white" sx={{ mb: 2 }}>
                Select your answer:
              </Typography>

              {clue?.options.map((opt: string) => (
                <motion.div
                  key={opt}
                  onClick={() => !selectedAnswer && handleAnswerClick(opt)}
                  whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      fontWeight: "medium",
                      mb: 1,
                      backgroundColor:
                        selectedAnswer === opt
                          ? isCorrect
                            ? "green"
                            : "#DC143C"
                          : "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:disabled": { cursor: "default" },
                    }}
                    disabled={!!selectedAnswer}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          color: selectedAnswer === opt ? "white" : "inherit",
                        }}
                      >
                        {opt}
                      </span>
                    </Box>
                  </Button>
                </motion.div>
              ))}
            </Box>
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: isCorrect
                        ? "rgba(0, 128, 0, 0.2)"
                        : "rgba(255, 0, 0, 0.2)",
                    }}
                  >
                    <Typography variant="body2" color="white">
                      {feedback}
                      {clue.funFact && (
                        <>
                          <br />
                          <br />
                          <strong>💡 Did you know?</strong> {clue.funFact}
                        </>
                      )}
                      {clue.trivia && (
                        <>
                          <br />
                          <br />
                          <strong>🔎 Trivia:</strong> {clue.trivia}
                        </>
                      )}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
      <Score score={score} fetchNewClue={fetchNewClue} />
    </div>
  );
};

export default ClueCard;
