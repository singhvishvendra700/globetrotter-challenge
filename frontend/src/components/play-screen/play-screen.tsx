import { useEffect } from "react";
import axios from "axios";
import { apiUrls } from "../../config/config";
import Header from "./header/header";
import ClueCard from "./clue-card/clue-card";
import Share from "../share/share";
import { usePlayScreen } from "./hook";
import ReactConfetti from "react-confetti";
import "./play-screen.css";

export default function PlayScreen() {
  const {
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
    handleShare,
    fetchNewClue,
    handleAnswerClick,
  } = usePlayScreen();

  useEffect(() => {
    if (invitedUsername) {
      axios
        .get(`${apiUrls().getUserScore}/${invitedUsername}`)
        .then((res) => setInviteeScore(res.data.score))
        .catch(() => setInviteeScore(null));
    }
  }, [invitedUsername]);

  useEffect(() => {
    fetchNewClue();
  }, []);

  return (
    <div ref={playRef} className="play-screen-container">
      {/* <Header
        username={username}
        setUsername={setUsername}
        invitedUsername={invitedUsername}
        inviteeScore={inviteeScore}
      /> */}
      {isCorrect && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
      <ClueCard
        clue={clue}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect ?? false}
        handleAnswerClick={handleAnswerClick}
        feedback={feedback}
        score={score}
        fetchNewClue={fetchNewClue}
        handleShare={handleShare}
      />
      <Share
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
}
