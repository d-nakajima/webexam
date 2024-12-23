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

    setGradedAnswer(snap.document, {
      ...original,
      ...data,
      status: "graded",
    });
    return;
  }
);
