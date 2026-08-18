// Keys
const KEYS = {
  CREDENTIAL: "merit_mark_credential",
  ASSESSMENT_RESULT: "merit_mark_assessment_result",
  ASSESSMENT_STATE: "merit_mark_assessment_state"
};

export const saveCredential = (credential) => {
  localStorage.setItem(KEYS.CREDENTIAL, JSON.stringify(credential));
};

export const getCredential = () => {
  const data = localStorage.getItem(KEYS.CREDENTIAL);
  return data ? JSON.parse(data) : null;
};

export const saveAssessmentResult = (result) => {
  localStorage.setItem(KEYS.ASSESSMENT_RESULT, JSON.stringify(result));
};

export const getAssessmentResult = () => {
  const data = localStorage.getItem(KEYS.ASSESSMENT_RESULT);
  return data ? JSON.parse(data) : null;
};

export const saveAssessmentState = (state) => {
  localStorage.setItem(KEYS.ASSESSMENT_STATE, JSON.stringify(state));
};

export const getAssessmentState = () => {
  const data = localStorage.getItem(KEYS.ASSESSMENT_STATE);
  return data ? JSON.parse(data) : null;
};

export const clearAssessmentState = () => {
  localStorage.removeItem(KEYS.ASSESSMENT_STATE);
};
