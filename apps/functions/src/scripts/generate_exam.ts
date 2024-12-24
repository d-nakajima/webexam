// import the Genkit and Google AI plugin libraries
import { googleAI, gemini15Flash } from "@genkit-ai/googleai";

import { genkit, z } from "genkit";
import { ExamSchema } from "../_shared";

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // set default model
});

const InputSchema = z.object({
  url: z.string().url().describe("記事のURL"),
});

const OutputDataSchema = ExamSchema.pick({
  title: true,
  shortTitle: true,
  abstract: true,
  questions: true,
});

const outputSchema = z.object({
  data: OutputDataSchema.describe("生成された問題"),
});

export const generateExam = ai.defineFlow(
  {
    name: "generateExam",
    inputSchema: InputSchema,
    outputSchema: outputSchema,
  },
  async (input) => {
    const url = input.url;
    const res = await ai.generate({
      system: `
    あなたは記事の理解度を確認するテストの作成者です。

    与えられたURLの内容から、要点が理解できているかを確認するテストを出力スキーマに沿って作成してください。
    テストは最大10問までとし、3~5分で回答できるものを設計してください。

    abstract: 記事の要約(最大100文字程度)
    title: タイトル
    shortTitle: 短いタイトル(日本語で15文字以下、もしくは英語で25文字以下)
    questions: 問題の配列

    問題は、以下のようなものを、ラジオボタン・チェックボックス・一行回答・テキストボックスで回答可能な形で生成してください
    一般論ではない、「記事で述べられている単語はどれか」、という問題は、選択肢に含めないでください。
    選択問題の場合の答えには、選択肢のindexを指定してください(0始まり)

    4択問題
    自由記述
    穴埋め問題
    順序並び替え問題
    ケーススタディ・シミュレーション
    正誤判定型
      `,
      output: {
        schema: outputSchema,
      },
      prompt: url,
    });
    if (res.output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return res.output;
  }
);
