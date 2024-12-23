// import the Genkit and Google AI plugin libraries
import { googleAI, gemini15Flash } from "@genkit-ai/googleai";

import { genkit, z } from "genkit";
import { AnswerSchema } from "../_shared";

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // set default model
});

const InputSchema = AnswerSchema.pick({
  content: true,
  examData: true,
});

const OutputDataSchema = AnswerSchema.pick({
  grades: true,
  whole_comment: true,
  score: true,
}).required();

const outputSchema = z.object({
  data: OutputDataSchema.describe("採点結果"),
});

export const gradeAnswer = ai.defineFlow(
  {
    name: "generateExam",
    inputSchema: InputSchema,
    outputSchema: outputSchema,
  },
  async (input) => {
    const system = `
    あなたは記事の理解度を確認するテストの採点者です。

    問題に対して、それぞれの回答が正しいかどうかを判定してください。
    全ての問題について正しい回答の短い解説を付与しつつ、誤った回答に関しては、どのように誤っているのかの解説を付与し、grades配列に挿入してください。
    部分的にあっている回答に関しては、正しい度合いに応じて点数を与えてください。

    各問題に割り振られた点数(問題タイトルの後に記載)に正解度合いを掛けた後、全ての問題の点数を合計し、
    最終的な点数を最大10に換算し、小数点第一位までの精度で算出したものを、scoreとして出力して下さい。

    - 問題

    ${buildQuestion(input.examData)}
    `;
    const res = await ai.generate({
      system,
      output: {
        schema: outputSchema,
      },
      prompt: buildAnswer(input),
    });
    console.log("inputToken", res.usage.inputTokens);
    console.log("outputToken", res.usage.outputTokens);
    if (res.output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return res.output;
  }
);

function buildQuestion(exam: z.infer<typeof InputSchema>["examData"]) {
  return exam.questions
    .map((q, index) => {
      return `
    ${index + 1}: ${q.title} (${q.point}点)\n
    答え: ${q.answer}\n
    ${q.description}\n
    ${q.options ? q.options?.map((o, i) => `${i}: ${o.text}\n`).join("\n") : ""}
    `;
    })
    .join("\n");
}

function buildAnswer(answer: z.infer<typeof InputSchema>) {
  return answer.content.map((a, index) => `${index + 1}: ${a}\n`).join("\n");
}
