import { z } from "zod";

export const SampleSchema = z.object({
  text: z.string(),
});

export type SampleType = z.infer<typeof SampleSchema>;
