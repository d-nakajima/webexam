import { initializeApp } from "firebase-admin/app";
import { onDocumentCreated } from "firebase-functions/firestore";
import { parseAdminReadDoc } from "./lib/AdminDocParser";
import { generateExam } from "./scripts/generate_exam";
import {
  setGeneratedExam,
  setGradedAnswer,
} from "./repositories/adminFirestore";
import { AnswerSchema, ExamSchema } from "./_shared";
import { gradeAnswer } from "./scripts/grade_answer";

initializeApp();

export const onCreateExam = onDocumentCreated(
  {
    region: "asia-northeast1",
    document: "exams/{examId}",
  },
  async (snap) => {
    if (!snap.data) return;

    const original = parseAdminReadDoc(snap.data.data(), ExamSchema);
    const { data } = await generateExam({ url: original.url });

    setGeneratedExam(snap.document, {
      ...original,
      ...data,
      status: "created",
    });
    return;
  }
);

export const onCreateAnswer = onDocumentCreated(
  {
    region: "asia-northeast1",
    document: "answers/{answerId}",
  },
  async (snap) => {
    if (!snap.data) return;

    const original = parseAdminReadDoc(snap.data.data(), AnswerSchema);
    const { data } = await gradeAnswer(original);

    const questions = original.examData.questions;
    const totalQuestionPoint = questions.reduce(
      (acc, question) => acc + question.point,
      0
    );

    const rawScore = data.grades.reduce((acc, grade, index) => {
      const questionPoint = questions[index].point;
      return acc + grade.rate * questionPoint;
    }, 0);

    // 最大10になるように正規化
    const score = 10 * (rawScore / totalQuestionPoint);

    setGradedAnswer(snap.document, {
      ...original,
      ...data,
      score,
      status: "graded",
    });
    return;
  }
);
