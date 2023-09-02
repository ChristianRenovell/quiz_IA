import { create } from "zustand";
import { getQuestions } from "../services/questions.service";
import { Quiz } from "../services/models/ResQuestions";

interface State {
  options: Options;
  setOptions: (newOptions: State['options']) => void;
  getQuestions:() => Promise<Quiz[]>
}

export interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

const useQuestionsStore = create<State>((set, get) => {
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
        const options = get().options;
        return await getQuestions(options);
    }
  };
});


export default useQuestionsStore



