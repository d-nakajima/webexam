// import { googleAI, gemini15Flash } from "@genkit-ai/googleai";
import openAI, { gpt4oMini } from "genkitx-openai";

import { genkit, z } from "genkit";
import { AnswerSchema } from "../_shared";

// configure a Genkit instance
const ai = genkit({
  // plugins: [googleAI()],
  // model: gemini15Flash,
  plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
  model: gpt4oMini, // set default model
});

const InputSchema = AnswerSchema.pick({
  content: true,
  examData: true,
});

const OutputDataSchema = AnswerSchema.pick({
  grades: true,
  whole_comment: true,
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
    const res = await ai.generate({
      system: SYSTEM_PROMPT,
      output: {
        schema: outputSchema,
      },
      prompt: `
      ---
      問題
      
      ${buildQuestion(input.examData)}
      ---
      回答
      
      ${buildAnswer(input)}
      `,
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
    正答例: ${q.answer}\n
    ${q.description}\n
    ${
      q.type === "multi_select" || q.type === "single_select"
        ? q.options?.map((o, i) => `${i}: ${o.text}\n`).join("\n")
        : ""
    }
    `;
    })
    .join("\n");
}

function buildAnswer(answer: z.infer<typeof InputSchema>) {
  return answer.content.map((a, index) => `${index + 1}: ${a}\n`).join("\n");
}

const SYSTEM_PROMPT = `
あなたは「記事の理解度を確認するテスト」の採点者です。以下の方針に従って受験者の回答を採点してください。

1. **採点対象**  
   - ユーザーが解答した各問題の「回答内容」  
   - 解答形式は4択や穴埋め、自由記述などさまざま。

2. **採点手順**  
   - 問題ごとに、ユーザーの回答が「正解かどうか」を判定する。  
   - **正答・誤答だけでなく、部分正解（部分的に合っている）も考慮する。**  

3. **採点結果の出力方法**  
   - 全ての問題について以下を行う:  
     1. **正答の場合**: 簡潔な正解の解説を付け加える。  
     2. **誤答の場合**:  
        - ユーザーがどのように誤解しているか、どんな点が不足しているかを短く説明する。  
        - ただし、必要以上にネガティブにならないよう、指摘は建設的に行う。  
     3. **部分正解の場合**:  
        - 「正解のどの部分に近い回答が得られているか」を指摘し、あと何が不足しているかを示す。  
        - この回答に対する正しい度合いを、**rate (0～1)** で示す。1が完全正解、0が全くの誤答とする。  
   - 問題ごとの採点結果を**grades配列**に入れて出力する。  

4. **記述問題について**  
   - 「記述問題の正答例」はあくまで参考であり、それ自体を模範解答として丸写しするのは避ける。  
   - 受験者のオリジナルな回答が内容的に正解していればよい。  
   - たとえ「正答例」と文面が違っていても、内容が正しければ高い評価を与える。  
   - 記事やテーマに関する思考プロセスや論理的整合性を判断し、部分的に正しい場合は正当の度合いを「rate(0〜1)」で示す。  

5. **解説方針**  
   - 正解に対しては、根拠や簡潔な理由を説明する（例：「○○だから正しい」）。  
   - 誤解や誤りがあった場合は、ユーザーが学びを深められるよう、どこが違うのか・何を補えばよいかを示す。  
   - 記事およびその周辺テーマの理解を促進するのが最終目的であるため、解説はなるべく分かりやすいものにする。  

6. **注意事項**  
   - ユーザーの回答が必ずしも完全正解または誤答に分けられない場合でも、前述の「rate」を使い、どの程度正解に近いか評価する。  
   - 解説の分量は多すぎる必要はないが、**学習を深めるためのヒント**として有用な内容を含める。  
   - 記事の具体的な内容に依存した採点ではなく、あくまでも「問題そのもの」の正誤や理解度、論点整理を重視する。
   - 記事の内容が一般論と剥離している場合は、その旨も解説に含める。
`;
