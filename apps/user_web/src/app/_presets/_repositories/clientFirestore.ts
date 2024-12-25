import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  answerCollectionPath,
  answerDocPath,
  examCollectionPath,
  examDocPath,
} from "./FirestorePath";
import {
  ClientCreateDocParser,
  ClientReadDocParser,
  parseClientUpdateDoc,
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

export function listenAnswer(
  id: string,
  callback: (answer: ReadDoc<AnswerType>) => void
) {
  return onSnapshot(_doc(answerDocPath(id)), (doc) => {
    if (!doc.exists()) return null;
    return callback(ClientReadDocParser(AnswerSchema, doc));
  });
}

export function listenUserAnswers(
  userId: string,
  callback: (answers: ReadDoc<AnswerType>[]) => void,
  options: { lastUpdatedAt: Date }
) {
  const _query = query(
    _collection(answerCollectionPath()),
    where("userId", "==", userId),
    where("createdAt", ">", options.lastUpdatedAt),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(_query, (snapshot) => {
    const answers = snapshot.docs.map((doc) =>
      ClientReadDocParser(AnswerSchema, doc)
    );
    return callback(answers);
  });
}

export function publishAnswer(id: string) {
  return updateDoc(
    _doc(answerDocPath(id)),
    parseClientUpdateDoc(AnswerSchema, {
      isPublish: true,
    })
  );
}

export function unpublishAnswer(id: string) {
  return updateDoc(
    _doc(answerDocPath(id)),
    parseClientUpdateDoc(AnswerSchema, {
      isPublish: false,
    })
  );
}
