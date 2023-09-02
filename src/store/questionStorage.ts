import { create } from "zustand";
import { getQuestions } from "../services/questions.service";

interface State {
  options: Options;
  setOptions: (newOptions: State['options']) => void;
  getQuestions:() => Promise<void>
}

export interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

const useQuestionsStore = create<State>((set) => {
  return {
    options: {
      numQuestions: "",
      difficulty: "",
      category: "",
    },
    setOptions: (newOptions) => {
      set((state) => ({
        options: { ...state.options, ...newOptions },
      }));
    },
    getQuestions: async ()=> {
       const resQuestions = await getQuestions();
       return resQuestions;
    }
  };
});


export default useQuestionsStore



