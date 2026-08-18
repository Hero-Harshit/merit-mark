/**
 * Calculates grade from score percentage
 * @param {number} score - Percentage from 0 to 100
 * @returns {string} Grade (O, A, B, C, D, F)
 */
export const calculateGrade = (score) => {
  if (score >= 90) return "O";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

/**
 * Checks if the score is passing
 * @param {number} score 
 * @returns {boolean}
 */
export const isPassing = (score) => {
  return score >= 50;
};
