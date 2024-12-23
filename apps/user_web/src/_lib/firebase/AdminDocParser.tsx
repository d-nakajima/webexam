import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const AdminUpdateDocParser = <T extends z.AnyZodObject>(
  data: object,
  schema: T
) => {
  const result = schema.parse(data);
  return {
    ...result,
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

export const AdminReadDocParser = <T extends z.AnyZodObject>(
  data: object,
  schema: T
) => {
  const { _createdAt, _updatedAt, ...rest } = schema.parse(data);
  const createdAt = (_createdAt as Timestamp).toDate();
  const updatedAt = (_updatedAt as Timestamp).toDate();
  const result = schema.parse(data);

  return {
    ...result,
    createdAt,
    updatedAt,
  };
};
