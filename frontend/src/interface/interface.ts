export interface ClueData {
  id: number;
  clues: string[];
  options: string[];
  correctAnswer: string;
  funFact: string;
  trivia: string;
}

export interface ChallengeFriendProps {
  username: string | null;
}

export interface RegisterProps {
  onRegister: (username: string) => void;
}

export interface GameState {
  score: number;
}

export interface ShareState {
  image: string | null;
}

export interface ClueCardProps {
  clue: {
    clues: string[];
    correctAnswer: string;
    funFact: string;
    options: string[];
    trivia: string;
  } | null; // Allow clue to be null
  selectedAnswer: string | null;
  isCorrect: boolean;
  handleAnswerClick: (answer: string) => void;
  feedback: string | null;
  score: number;
  fetchNewClue: () => void;
  handleShare: () => void;
}

export interface HeaderProps {
  invitedUsername: string | null;
  inviteeScore: number | null;
}

export interface ScoreProps {
  score: number;
  fetchNewClue: () => void;
  setHintIndex?: (index: number) => void;
}

export interface ShareButtonProps {
  handleShare: () => void;
}
