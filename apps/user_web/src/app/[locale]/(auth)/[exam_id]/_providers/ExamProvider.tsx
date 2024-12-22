"use client";

import { createContext, useContext } from "react";

type Question = object;

type Context = {
  questions: Question[];
};

const ExamContext = createContext<Context>({
  questions: [],
});

type Props = {
  children: React.ReactNode;
  id: string;
};
export default function ExamProvider(props: Props) {
  return (
    <ExamContext.Provider value={{ questions: [] }}>
      {props.children}
    </ExamContext.Provider>
  );
}

export const useExam = () => {
  return useContext(ExamContext);
};
