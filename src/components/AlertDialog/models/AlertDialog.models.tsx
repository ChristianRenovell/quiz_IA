export interface SelectOptions {
  value: number | string;
  key: string;
}

export const NUM_QUESTIONS: SelectOptions[] = [
  { key: '10', value: 10 },
  { key: '25', value: 25 },
  { key: '50', value: 50 },
];

export const DIFICULTY: SelectOptions[] = [
  { key: 'Facil', value: 'Facil' },
  { key: 'Media', value: 'Media' },
  { key: 'Avanzado', value: 'Avanzado' },
  { key: 'Dificil', value: 'Dificil' },
];
