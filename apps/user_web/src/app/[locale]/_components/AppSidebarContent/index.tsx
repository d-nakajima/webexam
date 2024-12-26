"use client";
import ExamSummaryList from "../ExamSummaryList";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { useUserAnswers } from "../../(auth)/_providers/UserAnswersProvider";

export default function AppSidebarContent() {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("authUser is not found");

  const { answers } = useUserAnswers();

  return (
    <div className="flex flex-col items-stretch w-full h-full overflow-scroll pt-10">
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
