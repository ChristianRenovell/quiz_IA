export interface Quiz {
  questions: Question[];
}

interface Question {
    question: string;
    options: string[];
    correct_answer: string;
    code: string | null;
  }
  