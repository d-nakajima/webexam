import { getFirestore } from "firebase-admin/firestore";
import { AdminReadDoc, parseAdminUpdateDoc } from "../lib/AdminDocParser";
import { ExamSchema, ExamType } from "../_shared";

export function setGeneratedExam(path: string, data: AdminReadDoc<ExamType>) {
  return getFirestore().doc(path).set(parseAdminUpdateDoc(data, ExamSchema));
}
