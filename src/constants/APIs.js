
const BASE_API = process.env.REACT_APP_BASE_URL;

const Endpoints = {
  postQuestion: () => `${BASE_API}/questions`,
  postAnswer: (id) => `${BASE_API}/questions/${id}`,
  getQuestions: (q) => `${BASE_API}/questions${q ? `?${q}` : ''}`,
  getQuestionById: (id) => `${BASE_API}/questions/${id}`,
  getProfile: () => `${BASE_API}/profile`,
  patchProfile: (id) => `${BASE_API}/profile/${id}`,
  getLimitedQuestions: (page) => `${BASE_API}/questions?_page=${page}&_limit=5`
};

export default Endpoints;