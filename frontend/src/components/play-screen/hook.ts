import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { incrementScore } from "../../store/slice/gameSlice";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { apiUrls } from "../../config/config";
import html2canvas from "html2canvas";
import { setImage } from "../../store/slice/shareSlice";
import { ClueData } from "../../interface/interface";

export const usePlayScreen = () => {
  const dispatch = useDispatch();
  const [clue, setClue] = useState<ClueData | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [inviteeScore, setInviteeScore] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const invitedUsername = searchParams.get("invite");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const playRef = useRef<HTMLDivElement>(null);
  const score = useSelector((state: RootState) => state.game.score);

  const handleShare = async () => {
    if (playRef.current) {
      const canvas = await html2canvas(playRef.current);
      const imgData = canvas.toDataURL("image/png");
      dispatch(setImage(imgData));
    }
    setShowShareModal(!showShareModal);
  };

  const fetchNewClue = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    axios
      .get(apiUrls().getRandomClues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => setClue(res.data))
      .catch(() => setFeedback("Failed to load clues!"));
  };

  const handleAnswerClick = async (selected: string) => {
    if (!clue || selectedAnswer) return;

    setSelectedAnswer(selected);

    try {
      const response = await axios.get(
        `${apiUrls().checkAnswer}/${clue.id}/${selected}`
      );

      const { correct, correctAnswer, funFact, trivia } = response.data;
      setIsCorrect(correct);

      if (correct) {
        dispatch(incrementScore());
        setFeedback(`🎉 Correct!`);
      } else {
        setFeedback(`😢 Incorrect!`);
      }
      setClue(
        (prevState) =>
          prevState && {
            ...prevState,
            correctAnswer: correctAnswer,
            funFact: funFact,
            trivia: trivia,
          }
      );
    } catch (error) {
      setFeedback("Failed to check answer!");
    }
  };

  return {
    clue,
    feedback,
    username,
    setUsername,
    invitedUsername,
    inviteeScore,
    setInviteeScore,
    selectedAnswer,
    isCorrect,
    showShareModal,
    setShowShareModal,
    playRef,
    score,
    dispatch,
    handleShare,
    fetchNewClue,
    handleAnswerClick,
  };
};
