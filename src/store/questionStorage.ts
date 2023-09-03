import { create } from "zustand";
import { Question } from "../services/models/ResQuestions";

export interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

interface State {
  options: Options;
  currentQuestion:number; 
  setOptions: (newOptions: State['options']) => void;
  setCurrentQuestion: (currentQuestion: State['currentQuestion']) => void;
  getQuestions:() => Promise<Question[]>
}

const useQuestionsStore = create<State>((set, get) => {
  return {
    options: {
      numQuestions: "",
      difficulty: "",
      category: "",
    },
    currentQuestion: 0,
    setOptions: (newOptions) => {
      set((state) => ({
        options: { ...state.options, ...newOptions },
      }));
    },
    setCurrentQuestion: (currentQuestion) => {
      set({ currentQuestion });
    },
    getQuestions: async ()=> {
        const options = get().options;
        console.log(options)
        const response = await fetch('./src/services/mocks/resQuizz.json');
        const resJson = await response.json();
        return resJson.questions;
    }
  };
});


export default useQuestionsStore



