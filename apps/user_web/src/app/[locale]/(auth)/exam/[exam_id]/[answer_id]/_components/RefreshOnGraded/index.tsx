"use client";

import { listenAnswer } from "@/app/_presets/_repositories/clientFirestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  answerId: string;
  revalidateAnswerCache: () => void;
};

export default function RefreshOnGraded(props: Props) {
  const isFirstLoaded = useRef(false);
  const { answerId, revalidateAnswerCache } = props;
  const { refresh } = useRouter();

  useEffect(() => {
    const unsubscribe = listenAnswer(answerId, (answer) => {
      if (isFirstLoaded && answer.status === "graded") {
        revalidateAnswerCache();
        refresh();
      }
      isFirstLoaded.current = true;
    });
    return unsubscribe;
  }, [answerId, refresh]);

  return props.children;
}
