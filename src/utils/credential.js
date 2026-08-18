/**
 * Generates a mock credential ID like MM-HTML-8F42K7
 * @param {string} prefix 
 * @returns {string}
 */
export const generateCredentialId = (prefix = "MM-HTML") => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomStr}`;
};

/**
 * Formats a date nicely
 * @param {Date} date 
 * @returns {string}
 */
export const formatDate = (date = new Date()) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
