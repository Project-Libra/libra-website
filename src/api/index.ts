export const getScores = () => fetch('http://localhost:7777')
  .then(response => response.json());
