import { Options } from "../store/questionStorage";
import { Quiz } from "./models/ResQuestions";

async function getQuestions(options: Options): Promise<Quiz[]> {
    console.log(options)
      const response = await fetch('./src/services/mocks/resQuizz.json');
      const data: Quiz[] = await response.json();
      return data;
  }
  
  export { getQuestions };