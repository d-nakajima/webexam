import { getFirestore } from "firebase-admin/firestore";
import { AdminReadDoc, parseAdminUpdateDoc } from "../lib/AdminDocParser";
import { AnswerSchema, AnswerType, ExamSchema, ExamType } from "../_shared";

export function setGeneratedExam(path: string, data: AdminReadDoc<ExamType>) {
  return getFirestore().doc(path).set(parseAdminUpdateDoc(data, ExamSchema));
}

export function setGradedAnswer(path: string, data: AdminReadDoc<AnswerType>) {
  return getFirestore().doc(path).set(parseAdminUpdateDoc(data, AnswerSchema));
}
