"use server";
import { initializeAdminSdk } from "@/_lib/firebase/FirebaseAdminInitializer";
import { getFirestore } from "firebase-admin/firestore";
import { answerDocPath, examDocPath } from "./FirestorePath";
import { parseAdminReadDoc } from "@/_lib/firebase/AdminDocParser";
import { AnswerSchema, ExamSchema } from "@/app/_shared";
import { isAfter } from "date-fns";



initializeAdminSdk();

export async function getExam(id: string) {
  return getFirestore()
    .doc(examDocPath(id))
    .get()
    .then((d) => {
      if (!d.exists) return null;
      return parseAdminReadDoc(d, ExamSchema);
    });
}

export async function getAnswer(id: string) {
  return getFirestore()
    .doc(answerDocPath(id))
    .get()
    .then((d) => {
      if (!d.exists) return null;
      return parseAdminReadDoc(d, AnswerSchema);
    });
}

export async function listUserExamAnswerHistory(
  userId: string,
  examId: string
) {
  return getFirestore()
    .collection("answers")
    .where("userId", "==", userId)
    .where("examId", "==", examId)
    .get()
    .then((d) =>
      d.docs
        .map((doc) => parseAdminReadDoc(doc, AnswerSchema))
        .sort((a, b) => (isAfter(b.createdAt, a.createdAt) ? 1 : -1))
    );
}

export async function listUserAnswers(userId: string) {
  return getFirestore()
    .collection("answers")
    .where("userId", "==", userId)
    .get()
    .then((d) =>
      d.docs
        .map((doc) => parseAdminReadDoc(doc, AnswerSchema))
        .sort((a, b) => (isAfter(b.createdAt, a.createdAt) ? 1 : -1))
    );
}
