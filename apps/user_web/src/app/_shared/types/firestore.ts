import { z } from "zod";

export const SampleSchema = z.object({
  text: z.string(),
});

export type SampleType = z.infer<typeof SampleSchema>;

export const ExamSchema = z.object({
  status: z.enum(["requested", "creating", "created"]),
  title: z.string(),
  shortTitle: z.string(),
  abstract: z.string(),
  url: z.string().url({
    message: "invalid_url",
  }),
  media: z.enum(["system", "twitter", "web_extension"]),
  questions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(["line_text", "free_text", "single_select", "multi_select"]),
      point: z.number(),
      options: z
        .object({
          text: z.string(),
          image: z.string().optional(),
        })
        .array()
        .optional(),
      answer: z.string(),
    })
  ),
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
