import {
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { z } from "zod";
import { ReadDoc } from "./ReadDoc";

export const ClientUpdateDocParser = <T extends z.AnyZodObject>(
  schema: T,
  data: z.infer<typeof schema>
) => {
  const result = schema.parse(data);
  return {
    ...result,
    updatedAt: serverTimestamp(),
  };
};

export const ClientCreateDocParser = <T extends z.AnyZodObject>(
  schema: T,
  data: z.infer<typeof schema>
) => {
  const result = schema.parse(data);
  return {
    ...result,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
};

export type ClientReadDoc<T> = {
  id: string;
  snapshot: DocumentSnapshot;
  createdAt: Date;
  updatedAt: Date;
} & T;

export const ClientReadDocParser = <T extends z.AnyZodObject>(
  schema: T,
  snapshot: DocumentSnapshot
): ReadDoc<z.infer<T>> => {
  const { createdAt, updatedAt, ...rest } = snapshot.data() as Record<
    string,
    unknown
  >;

  const _createdAt = (createdAt as Timestamp).toDate();
  const _updatedAt = (updatedAt as Timestamp).toDate();
  const result = schema.parse(rest);

  return {
    ...result,
    id: snapshot.id,
    path: snapshot.ref.path,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  };
};
