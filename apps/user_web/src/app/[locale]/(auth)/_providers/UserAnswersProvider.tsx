"use client";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import { listenUserAnswers } from "@/app/_presets/_repositories/clientFirestore";
import { cacheListOwnAnswers } from "@/app/_presets/_utils/cache";
import { AnswerType } from "@/app/_shared";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type Context = {
  answers: ReadDoc<AnswerType>[];
};

const Context = createContext<Context>({
  answers: [],
});

type Props = {
  children: React.ReactNode;
};

export default function UserAnswersProvider(props: Props) {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("user is not authenticated");

  const initialAnswers = useRef<ReadDoc<AnswerType>[]>([]);
  const [answers, setAnswers] = useState<ReadDoc<AnswerType>[]>([]);
  const [cacheAt, setCacheAt] = useState<Date>();

  useEffect(() => {
    cacheListOwnAnswers().then(({ data, cacheAt }) => {
      initialAnswers.current = data;
      setAnswers(data);
      setCacheAt(cacheAt);
    });
  }, [authUser.uid]);

  useEffect(() => {
    if (!cacheAt) return;

    return listenUserAnswers(
      authUser.uid,
      (updates) => {
        setAnswers([...updates, ...initialAnswers.current]);
      },
      { lastUpdatedAt: cacheAt }
    );
  }, [authUser.uid, cacheAt]);

  return (
    <Context.Provider value={{ answers: answers }}>
      {props.children}
    </Context.Provider>
  );
}

export const useUserAnswers = () => useContext(Context);
