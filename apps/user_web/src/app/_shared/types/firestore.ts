import { z } from "zod";

export const SampleSchema = z.object({
  text: z.string(),
});

export type SampleType = z.infer<typeof SampleSchema>;

const QuestionSchemaBase = z.object({
  title: z.string(),
  description: z.string(),
  point: z.number(),
});

const SingleSelectQuestionSchema = z
  .object({
    type: z.literal("single_select"),
    options: z
      .object({
        text: z.string(),
        image: z.string().optional(),
      })
      .array(),
    answer: z.number().describe("index of options"),
  })
  .merge(QuestionSchemaBase);

const MultiSelectQuestionSchema = z
  .object({
    type: z.literal("multi_select"),
    options: z
      .object({
        text: z.string(),
        image: z.string().optional(),
      })
      .array(),
    answer: z.number().array().describe("indexes of options"),
  })
  .merge(QuestionSchemaBase);

const TextQuestionSchema = z
  .object({
    type: z.enum(["line_text", "free_text"]),
    answer: z.string(),
  })
  .merge(QuestionSchemaBase);

const QuestionSchema = z.union([
  SingleSelectQuestionSchema,
  MultiSelectQuestionSchema,
  TextQuestionSchema,
]);

export type QuestionType = z.infer<typeof QuestionSchema>;

export const ExamSchema = z.object({
  status: z.enum(["requested", "creating", "created"]),
  title: z.string(),
  shortTitle: z.string(),
  abstract: z.string(),
  url: z.string().url({
    message: "invalid_url",
  }),
  media: z.enum(["system", "twitter", "web_extension"]),
  questions: QuestionSchema.array(),
});

export type ExamType = z.infer<typeof ExamSchema>;

export const UserSchema = z.object({
  name: z.string(),
  profileUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;

export const AnswerSchema = z.object({
  userId: z.string(),
  examId: z.string(),
  examData: ExamSchema,
  status: z.enum(["answered", "grading", "graded"]),
  isPublish: z.boolean(),
  content: z.string().array(),
  grades: z
    .object({
      rate: z.number().min(0).max(1),
      comment: z.string(),
    })
    .array(),
  whole_comment: z.string().optional(),
  score: z.number().optional(),
});

export type AnswerType = z.infer<typeof AnswerSchema>;
