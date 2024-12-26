"use client";

import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import {
  revalidateAnswerCache,
  revalidateUserAnswersCache,
} from "@/app/_presets/_utils/cache";
import { AnswerType } from "@/app/_shared";
import { useEffect, useState } from "react";
import PageContent from ".";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { listenOwnAnswer } from "@/app/_presets/_repositories/clientFirestore";
import ReactLoading from "react-loading";

type Props = {
  answerId: string;
};

export default function ClientPageContent(props: Props) {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("user is not authenticated");

  const [answer, setAnswer] = useState<ReadDoc<AnswerType>>();

  useEffect(() => {
    return listenOwnAnswer(props.answerId, authUser.uid, (data) => {
      if (!data) return;
      if (answer && answer.status !== "graded" && data.status === "graded") {
        revalidateAnswerCache(props.answerId, data.examId);
        revalidateUserAnswersCache();
        console.log("revalidateUserAnswersCache");
      }

      setAnswer(data);
    });
  }, [props.answerId, authUser.uid]);

  return answer ? (
    <PageContent answer={answer} />
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <ReactLoading type="bars" width={50} height={50} color="white" />
    </div>
  );
}
