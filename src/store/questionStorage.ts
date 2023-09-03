import { create, SetState } from "zustand";
import { Question } from "../services/models/ResQuestions";

interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

interface State {
  options: Options;
  currentQuestion: number;
  totalQuestions: number;
  setOptions: (newOptions: Options) => void;
  backQuestion: () => void;
  nextQuestion: () => void;
  getQuestions: () => Promise<Question[]>;
}

const useQuestionsStore = create<State>((set: SetState<State>) => ({
  options: {
    numQuestions: "",
    difficulty: "",
    category: "",
  },
  currentQuestion: 0,
  totalQuestions: 0,
  setOptions: (newOptions: Options) =>
    set((state) => ({
      options: { ...state.options, ...newOptions },
    })),
  backQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    }));
  },
  nextQuestion: () => {
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, state.totalQuestions - 1),
    }));
  },
  getQuestions: async () => {
    const options = useQuestionsStore.getState().options;

    try {
      const response = await fetch('./src/services/mocks/resQuizz.json');
      const resJson = await response.json();
      set({
        totalQuestions: resJson.questions.length,
      });
      return resJson.questions;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  },
}));

export default useQuestionsStore;