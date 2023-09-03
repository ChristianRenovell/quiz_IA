export interface Quiz {
  questions: Question[];
}

export interface Question {
    question: string;
    options: string[];
    selected_answer?: number,
    correct_answer: number;
    code?: string;
  }
  