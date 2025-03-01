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
  const dispatch = useDispatch();

  const handleShare = async () => {
    if (playRef.current) {
      const canvas = await html2canvas(playRef.current);
      const imgData = canvas.toDataURL("image/png");
      dispatch(setImage(imgData));
    }
    setShowShareModal(!showShareModal);
  };

  const fetchNewClue = () => {
    console.log("hii");
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

  const handleAnswerClick = (selected: string) => {
    if (!clue || selectedAnswer) return;

    setSelectedAnswer(selected);
    const correct = selected === clue.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      dispatch(incrementScore());
      setFeedback(`🎉 Correct!`);
    } else {
      setFeedback(`😢 Incorrect!`);
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
