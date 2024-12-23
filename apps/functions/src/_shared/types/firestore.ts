import { z } from "zod";

export const SampleSchema = z.object({
  text: z.string(),
});

export type SampleType = z.infer<typeof SampleSchema>;

export const ExamSchema = z.object({
  status: z.enum(["requested", "creating", "created"]),
  title: z.string(),
  description: z.string(),
  url: z.string().url({
    message: "invalid_url",
  }),
  media: z.enum(["system", "twitter", "web_extension"]),
  questions: z.array(
    z.object({
      type: z.enum(["line_text", "free_text", "single_select", "multi_select"]),
      question: z.string(),
      point: z.number(),
      options: z
        .object({
          text: z.string(),
          image: z.string().optional(),
        })
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
  userRef: z.string(),
  questionRef: z.string(),
  status: z.enum(["answered", "grading", "graded"]),
  isPublish: z.boolean(),
  content: z.array(z.string()),
  grades: z.array(
    z.object({
      point: z.number(),
      comment: z.string(),
    })
  ),
  whole_comment: z.string().optional(),
  score: z.number().optional(),
});

export type AnswerType = z.infer<typeof AnswerSchema>;
