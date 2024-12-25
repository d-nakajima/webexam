import { unstable_cache } from "next/cache";
import {
  listUserAnswers,
  listUserExamAnswerHistory,
} from "../_repositories/adminFirestore";

export const userExamAnswerHistoryCacheTag = (userId: string, examId: string) =>
  `answer_history_${userId}_${examId}`;
export const answerCacheTag = (answerId: string) => `answer_${answerId}`;
export const userAnswersCacheTag = (userId: string) => `answers_${userId}`;

export function cacheListUserExamAnswerHistory(
  authUserId: string,
  examId: string
) {
  const tags = [userExamAnswerHistoryCacheTag(authUserId, examId)];
  return unstable_cache(
    (userId: string, examId: string) =>
      listUserExamAnswerHistory(userId, examId),
    [],
    { tags }
  );
}

export function cacheListUserAnswers(authUserId: string) {
  const tags = [userAnswersCacheTag(authUserId)];
  return unstable_cache((userId: string) => listUserAnswers(userId), [], {
    tags,
  });
}
