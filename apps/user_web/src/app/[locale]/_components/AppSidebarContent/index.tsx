"use client";
import { useEffect, useState } from "react";
import ExamSummaryList from "../ExamSummaryList";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import { AnswerType } from "@/app/_shared";
import { listenUserAnswers } from "@/app/_presets/_repositories/clientFirestore";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";

export default function AppSidebarContent() {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("authUser is not found");

  const [answers, setAnswers] = useState<ReadDoc<AnswerType>[]>([]);
  useEffect(() => {
    return listenUserAnswers(authUser.uid, (answers) => {
      setAnswers(answers);
    });
  }, [authUser.uid]);

  return (
    <div className="flex flex-col items-stretch w-full h-full">
      <div className="flex-grow" />
      <ExamSummaryList
        items={answers.map((answer) => ({
          id: answer.id,
          examId: answer.examId,
          date: answer.createdAt,
          title: answer.examData.shortTitle,
          url: answer.examData.url,
          score: answer.score,
        }))}
      />
    </div>
  );
}
