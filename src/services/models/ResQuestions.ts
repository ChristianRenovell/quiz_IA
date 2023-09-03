export interface Quiz {
  questions: Question[];
}

export interface Question {
    question: string;
    options: string[];
    correct_answer: string;
    code: string | null;
  }
  