export const baseUrl = "http://127.0.0.1:5000/api";

export const apiUrls = () => {
  return {
    generateInvite: `${baseUrl}/generate-invite`,
    getUserScore: `${baseUrl}/get-user-score`,
    getRandomClues: `${baseUrl}/clues/random`,
    registerUser: `${baseUrl}/register`,
  };
};
