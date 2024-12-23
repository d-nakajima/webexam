import { initializeAdminSdk } from "@/_lib/firebase/FirebaseAdminInitializer";
import { getFirestore } from "firebase-admin/firestore";
import { examDocPath } from "./FirestorePath";
import { parseAdminReadDoc } from "@/_lib/firebase/AdminDocParser";
import { ExamSchema } from "@/app/_shared";

initializeAdminSdk();

export function getExam(id: string) {
  return getFirestore()
    .doc(examDocPath(id))
    .get()
    .then((d) => {
      if (!d.exists) return null;
      const data = d.data();
      if (!data) return null;
      return parseAdminReadDoc(data, ExamSchema);
    });
}
