import { initializeAdminSdk } from "@/_lib/firebase/FirebaseAdminInitializer";
import { getFirestore } from "firebase-admin/firestore";
import { answerDocPath, examDocPath } from "./FirestorePath";
import { parseAdminReadDoc } from "@/_lib/firebase/AdminDocParser";
import { AnswerSchema, ExamSchema } from "@/app/_shared";

initializeAdminSdk();

export function getExam(id: string) {
  return getFirestore()
    .doc(examDocPath(id))
    .get()
    .then((d) => {
      if (!d.exists) return null;
      return parseAdminReadDoc(d, ExamSchema);
    });
}

export function getAnswer(id: string) {
  return getFirestore()
    .doc(answerDocPath(id))
    .get()
    .then((d) => {
      if (!d.exists) return null;
      return parseAdminReadDoc(d, AnswerSchema);
    });
}
