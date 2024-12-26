"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { getAnswer, listUserAnswers } from "../_repositories/adminFirestore";
import { userAnswersCacheTag, answerCacheTag } from "./cache_tag";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";
import { answerRoutePath } from "./route_builder";

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
  })(answerId);
}

export async function revalidateAnswerCache(answerId: string, examId: string) {
  revalidateTag(answerCacheTag(answerId));
  revalidatePath(answerRoutePath(examId, answerId));
}

export async function revalidateUserAnswersCache() {
  const authUser = await getServerAuthUser();
  if (!authUser) throw new Error("authUser is not found");
  revalidateTag(userAnswersCacheTag(authUser.uid));
}

export async function cacheGetOwnAnswer(answerId: string, userId: string) {
  const authUser = await getServerAuthUser();
  if (!authUser) throw new Error("authUser is not found");
  if (authUser.uid !== userId) return null;

  return unstable_cache(
    (answerId: string, userId: string) =>
      getAnswer(answerId).then((answer) => {
        if (answer?.userId !== userId) return null;
        return answer;
      }),
    [],
    {
      tags: [answerCacheTag(answerId)],
    }
  )(answerId, userId);
}
