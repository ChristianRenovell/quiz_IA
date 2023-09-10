import { create, SetState } from 'zustand';
import { Question } from '../services/models/ResQuestions';

interface Options {
  numQuestions: string;
  difficulty: string;
  category: string;
}

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
    valorPropiedad: string | boolean
  ) => void;
  getQuestions: () => void;
  getResultQuiz: () => number;
  resetState: () => number;
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
    índice: number,
    nombrePropiedad: string,
    valorPropiedad: string | boolean
  ) => {
    set((state) => {
      const preguntasActualizadas: Question[] = [...state.questions];
      if (índice >= 0 && índice < preguntasActualizadas.length) {
        preguntasActualizadas[índice][nombrePropiedad] = valorPropiedad;
      }

      state.quizCompleted =
        state.questions.findIndex(
          (element) => element.selected_answer === null
        ) === -1;
      return { questions: preguntasActualizadas };
    });
  },
  getQuestions: async () => {
    const options = useQuestionsStore.getState().options;

    const body = {
      model: 'gpt-3.5-turbo',
      prompt: JSON.stringify(options),
      max_tokens: 50,
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
        'http://localhost:3000/quiz/completion',
        opciones
      );
      const resJson = await response.json();
      const questionsJsonRes = JSON.parse(resJson[0].message.content);

      set({
        totalQuestions: questionsJsonRes.questions.length,
        questions: questionsJsonRes.questions,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
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
}));

export default useQuestionsStore;
