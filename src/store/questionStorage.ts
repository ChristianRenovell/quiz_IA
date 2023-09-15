import { create } from 'zustand';
import { Question } from '../services/models/ResQuestions';
import { environment } from '../environment.';
import moment, { Moment } from 'moment';

export interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

type RepeatQuizUpdate = {
  currentQuestion: number;
  loading: boolean;
  quizCompleted: boolean;
  questions: Question[];
};

interface State {
  options: Options;
  questions: Question[];
  currentQuestion: number;
  totalQuestions: number;
  loading: boolean;
  quizCompleted: boolean;
  setOptions: (newOptions: Options) => void;
  backQuestion: () => void;
  nextQuestion: () => void;
  updateQuestion: (
    índice: number,
    nombrePropiedad: string,
    valorPropiedad: string | boolean | number
  ) => void;
  getQuestions: () => Promise<boolean>;
  getResultQuiz: () => number;
  resetState: () => void;
  repeatQuiz: () => void;
  getTimer: () => string;
  startTime: Moment | null;
}

const useQuestionsStore = create<State>((set, get) => ({
  options: {
    numQuestions: '',
    difficulty: '',
    category: '',
  },
  questions: [],
  currentQuestion: 0,
  totalQuestions: 0,
  loading: true,
  quizCompleted: false,
  startTime: null,
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
      currentQuestion: Math.min(
        state.currentQuestion + 1,
        state.totalQuestions - 1
      ),
    }));
  },
  getHists: () => {
    set((state) => {
      return state;
    });
  },
  updateQuestion: (
    index: number,
    newProperty: string,
    valueProperty: string | boolean | number
  ) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateQuestion: Question[] | any = [...state.questions];
      if (index >= 0 && index < updateQuestion.length) {
        updateQuestion[index][newProperty] = valueProperty;
      }

      state.quizCompleted =
        state.questions.findIndex(
          (element) => element.selected_answer === null
        ) === -1;
      return { questions: updateQuestion };
    });
  },
  getQuestions: async () => {
    const options = useQuestionsStore.getState().options;

    const body = {
      prompt: JSON.stringify(options),
    };

    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        environment.apiquiz + '/quiz/completion',
        opciones
      );
      const resJson = await response.json();
      const questionsJsonRes = JSON.parse(resJson[0].message.content);
      if (questionsJsonRes.questions.length > 0) {
        set({
          totalQuestions: questionsJsonRes.questions.length,
          questions: questionsJsonRes.questions,
          loading: false,
          startTime: moment(),
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  getResultQuiz: () => {
    return get().questions.filter(
      (element) => element.correct_answer === element.selected_answer
    ).length;
  },
  resetState: () => {
    set({
      options: {
        numQuestions: '',
        difficulty: '',
        category: '',
      },
      questions: [],
      currentQuestion: 0,
      totalQuestions: 0,
      loading: true,
      quizCompleted: false,
    });
  },
  repeatQuiz: () => {
    set((state: State) => {
      const updatedState: RepeatQuizUpdate = {
        currentQuestion: 0,
        loading: false,
        quizCompleted: false,
        questions: state.questions.map((question) => ({
          ...question,
          selected_answer: null,
          answered: false,
        })),
      };

      return updatedState;
    });
  },
  getTimer: () => {
    const endTime = moment();
    const result = endTime.diff(useQuestionsStore.getState().startTime);
    return moment(result).format('MM:SS');
  },
}));

export default useQuestionsStore;
