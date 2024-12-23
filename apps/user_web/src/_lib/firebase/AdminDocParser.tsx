import { DocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const parseAdminUpdateDoc = <T extends z.AnyZodObject>(
  data: object & {
    createdAt: Date;
    updatedAt: Date;
  },
  schema: T
) => {
  const result = schema.parse(data);
  return {
    ...result,
    createdAt: data.createdAt,
    updatedAt: new Date(),
  };
};

export const AdminCreateDocParser = <T extends z.AnyZodObject>(
  data: object,
  schema: T
) => {
  const result = schema.parse(data);
  return {
    ...result,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export type AdminReadDoc<T> = {
  id: string;
  snapshot: DocumentSnapshot;
  createdAt: Date;
  updatedAt: Date;
} & T;

export const parseAdminReadDoc = <T extends z.AnyZodObject>(
  data: object,
  schema: T
) => {
  const { createdAt, updatedAt } = data as Record<string, unknown>;
  const _createdAt = (createdAt as Timestamp).toDate();
  const _updatedAt = (updatedAt as Timestamp).toDate();
  const result = schema.parse(data);

  return {
    ...result,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  } as AdminReadDoc<T["_type"]>;
};
