
async function getQuestions() {
      const response = await fetch('./src/services/mocks/resQuizz.json');
      const data = await response.json();
      return data;
  }
  
  export { getQuestions };