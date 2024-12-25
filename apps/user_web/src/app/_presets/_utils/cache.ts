"use server";
import { revalidateTag, unstable_cache } from "next/cache";
import {
  getAnswer,
  listUserAnswers,
  listUserExamAnswerHistory,
} from "../_repositories/adminFirestore";
import {
  userExamAnswerHistoryCacheTag,
  userAnswersCacheTag,
  answerCacheTag,
} from "./cache_tag";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";

export async function cacheListUserExamAnswerHistory(
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

export async function cacheListOwnAnswers() {
  const authUser = await getServerAuthUser();
  if (!authUser) throw new Error("authUser is not found");
  const tags = [userAnswersCacheTag(authUser.uid)];
  return unstable_cache(
    async (userId: string) => {
      return {
        cacheAt: new Date(),
        data: await listUserAnswers(userId),
      };
    },
    [],
    {
      tags,
    }
  )(authUser.uid);
}

export async function cacheGetAnswer(answerId: string) {
  return unstable_cache((answerId: string) => getAnswer(answerId), [], {
    tags: [answerCacheTag(answerId)],
  });
}
