import { useState, useRef } from "react";
import axios from "axios";
import { apiUrls } from "../../config/config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChallengeFriendProps } from "../../interface/interface";

export const useChallengeFriend = ({ username }: ChallengeFriendProps) => {
  const [showModal, setShowModal] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const generatedImage = useSelector((state: RootState) => state.share.image);
  const imageRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChallenge = () => {
    if (!username) return alert("⚠️ Please register before challenging!");

    axios
      .get(`${apiUrls().generateInvite}/${username}`)
      .then((res) => {
        setInviteLink(res.data.invite_link);
        setScore(res.data.score);
        setShowModal(true);
      })
      .catch((err) => console.error(err));
  };

  const copyToClipboard = () => {
    setShowAlert(true);
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
    }
    setTimeout(() => setShowAlert(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!inviteLink) return;

    const storedImage = generatedImage;
    if (!storedImage) return alert("No preview image available!");

    const a = document.createElement("a");
    a.href = storedImage;
    a.download = "globetrotter_challenge.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const message = `🚀 ${username} scored ${score} points in the Globetrotter Challenge! Can you beat them? Play now: ${inviteLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    setTimeout(() => window.open(whatsappUrl, "_blank"), 1000);
  };

  return {
    showAlert,
    showModal,
    username,
    score,
    inviteLink,
    generatedImage,
    imageRef,
    handleChallenge,
    copyToClipboard,
    shareOnWhatsApp,
    setShowModal,
  };
};
