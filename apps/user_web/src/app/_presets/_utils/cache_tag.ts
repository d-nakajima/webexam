export const userExamAnswerHistoryCacheTag = (userId: string, examId: string) =>
  `answer_history_${userId}_${examId}`;
export const answerCacheTag = (answerId: string) => `answer_${answerId}`;
export const userAnswersCacheTag = (userId: string) => `answers_${userId}`;
