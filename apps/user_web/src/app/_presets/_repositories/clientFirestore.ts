import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import {
  answerCollectionPath,
  examCollectionPath,
  examDocPath,
} from "./FirestorePath";
import {
  ClientCreateDocParser,
  ClientReadDocParser,
} from "@/_lib/firebase/ClientDocParser";
import { AnswerSchema, AnswerType, ExamSchema, ExamType } from "@/app/_shared";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";

export function _collection(path: string) {
  return collection(getFirestore(), path);
}

export function _doc(path: string) {
  return doc(getFirestore(), path);
}

export function createExam(url: string) {
  return addDoc(
    _collection(examCollectionPath()),
    ClientCreateDocParser(ExamSchema, {
      url,
      status: "requested",
      title: "",
      shortTitle: "",
      abstract: "",
      media: "system",
      questions: [],
    })
  );
}

export function listenExam(
  id: string,
  callback: (exam: ReadDoc<ExamType>) => void
) {
  return onSnapshot(_doc(examDocPath(id)), (doc) => {
    if (!doc.exists()) return null;
    console.log("doc", doc);
    return callback(ClientReadDocParser(ExamSchema, doc));
  });
}

export function submitAnswer(answer: AnswerType) {
  return addDoc(
    _collection(answerCollectionPath()),
    ClientCreateDocParser(AnswerSchema, {
      ...answer,
    })
  );
}
