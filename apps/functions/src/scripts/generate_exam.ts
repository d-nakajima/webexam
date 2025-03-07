// import the Genkit and Google AI plugin libraries
import { googleAI, gemini15Pro } from "@genkit-ai/googleai";
// import { googleAI, gemini15Flash } from "@genkit-ai/googleai";
import openAI, { gpt4oMini } from "genkitx-openai";

import { genkit, z } from "genkit";
import { ExamSchema } from "../_shared";
import { JSDOM } from "jsdom";
import { ZodTypeAny } from "zod";

function schemaToString(schema: ZodTypeAny): string {
  if (schema instanceof z.ZodString) return "z.string()";
  if (schema instanceof z.ZodNumber) return "z.number()";
  if (schema instanceof z.ZodBoolean) return "z.boolean()";
  if (schema instanceof z.ZodLiteral) {
    return `z.literal(${JSON.stringify(schema._def.value)})`;
  }
  if (schema instanceof z.ZodOptional) {
    return `${schemaToString(schema._def.innerType)}.optional()`;
  }
  if (schema instanceof z.ZodArray) {
    return `z.array(${schemaToString(schema._def.type)})`;
  }
  if (schema instanceof z.ZodObject) {
    const shape = schema._def.shape();
    const entries = Object.entries(shape)
      .map(([key, value]) => `${key}: ${schemaToString(value as ZodTypeAny)}`)
      .join(", ");
    return `z.object({ ${entries} })`;
  }
  if (schema instanceof z.ZodUnion) {
    return `z.union([${schema._def.options.map(schemaToString).join(", ")}])`;
  }
  if (schema instanceof z.ZodIntersection) {
    return `z.intersection(${schemaToString(
      schema._def.left
    )}, ${schemaToString(schema._def.right)})`;
  }
  if (schema instanceof z.ZodEffects) {
    return `z.preprocess( /* function */ , ${schemaToString(
      schema._def.schema
    )})`;
  }
  if (schema instanceof z.ZodRecord) {
    return `z.record(${schemaToString(schema._def.valueType)})`;
  }
  if (schema instanceof z.ZodTuple) {
    return `z.tuple([${schema._def.items.map(schemaToString).join(", ")}])`;
  }
  return "z.unknown()";
}

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI(), openAI({ apiKey: process.env.OPENAI_API_KEY })],
  // plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
  // model: gpt4oMini, // set default model
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
    const isExist = await fetch(url, {
      method: "HEAD",
    }).then((res) => res.ok);
    if (!isExist) {
      throw new Error("Invalid URL");
    }
    const dom = await JSDOM.fromURL(url);
    const text = dom.window.document.body.textContent;

    if (!text) {
      throw new Error("Failed to fetch content");
    }

    const res = await ai.generate({
      system: `${SYSTEM_PROMPT}

      ---

      出力は以下のスキーマ定義に沿ってください。
      ${schemaToString(outputSchema)}

      `,
      prompt: text,
      model: gemini15Pro,
    });
    if (res.output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }

    console.log(res.output);

    const formatResponse = await ai.generate({
      system: `
      与えられたデータを以下のスキーマ定義に沿って整形してください。
      各questionのtitle, descriptionはtitleが長くならないようにdescriptionに移すなど、適当に調整してください。
      ${schemaToString(outputSchema)}
      `,
      prompt: JSON.stringify(res.output),
      model: gpt4oMini,
      output: {
        schema: outputSchema,
      },
    });

    if (formatResponse.output == null) {
      throw new Error("Format Response doesn't satisfy schema.");
    }

    return formatResponse.output;
  }
);

const SYSTEM_PROMPT = `
あなたは学習者の理解度を確認するための問題作成に特化したアシスタントです。
HTMLドキュメントのbody情報を元に、以下の要件に従って問題を作成してください。  
ただし、記事に依存しすぎず、記事を読んでいなくても解ける問題、を作成するようにしてください。  

---

1. 目的
   - ユーザーが記事の扱うテーマや関連事象について、基礎から応用までの理解度を確認できるようにする。
   - 記事を読まなくても解ける内容としつつ、記事に対する理解・考察を深める問題を作成する。
   - 知識を定着させるだけでなく、考察力や応用力を引き出す問題を作成する。

---
2. 問題の記事依存を避けるためのガイドライン
   - 「記事の中で取り上げられている〇〇」「記事では〇〇と述べられている」など、記事の記述をそのまま問う問題は作成しない。
   - 学習者が記事を読んでいない、または記事の内容を覚えていなくても解けるように、「問題文」自体に必要な情報を盛り込む、あるいは一般的に知られている知識や想定しやすい事例を用いる。
   - ~に関する重要なポイントは何か、〜の重要な用語を挙げる、など答えが絞れないような問いは避ける。

---

3. 回答形式
   ユーザーが問題に回答するときは、以下の回答形式が利用される予定です。
   - ラジオボタン（単一選択）
   - チェックボックス（複数選択）
   - 一行回答（短文回答）
   - テキストボックス（長文回答）

---

4. 問題の種類
   以下の問題形式を用いて作成してください。（ただし、記事内容に直接依存しない形で）
   
   1. 4択問題
      - 選択肢は4つとし、それぞれ単一回答（ラジオボタン形式）とする。
      - 記事のテーマや関連分野の一般知識、基礎理論、重要概念などを問う。
      - 問題文中に選択肢を含める必要はない
      - 正答は選択肢を0始まりの連番で示した時の番号で表す

   2. 自由記述
      - 学習者が自由に考えを回答できるようにする。
      - 記事のテーマや関連する一般的な課題を想定した問題を出し、要点をまとめたり、批判的思考を問う形にする。
      - 模範的な回答例を付記する。

   3. 穴埋め問題
      - 記事のテーマに関連する重要用語・基礎的な数値やキーワードを使用し、理解度を確認する。
      - 回答は一行回答形式とし、解答例や正解を付ける。
      - 必要に応じて問題文中で「この用語は～という特徴がある」といった補足をして、記事未読でも解ける形にする。

   4. 順序並び替え問題
      - 一般的な手順やプロセス、時系列を正しく並べ替えさせる問題。
      - 複数の候補となる順序（例：「1 → 2 → 3」「1 → 3 → 2」など）を4択程度で提示し、ラジオボタンで回答できるようにする。
      - 問題番号は0から始まるindexで表す。
      - 解答例も含める。  
      - 記事を読んでいなくても、常識や一般的手順を推察できるように問題文を工夫する。  
      - 問題文中に選択肢を含める必要はない
      - 正答は選択肢を0始まりの連番で示した時の番号で表す

   5. ケーススタディ・シミュレーション（Case Study / Simulation）  
      - 記事のテーマを想定した、一般的な場面や課題設定を提示し、問題解決や判断を問う。  
      - ユーザーが記事を未読でも解けるよう、「こういう状況ならば、どのように対応すべきか？」といった内容にし、必要な背景情報は問題文に書く。  
      - 自由記述または複数選択形式で回答できるようにし、模範的な回答例を付記する。  

   6. 正誤判定型
      - 記事のテーマに関連する短い文章を提示し、正しいか誤っているかを問う。  
      - ただし、4つの選択肢を設ける。
      - 問題番号は0から始まるindexで表す。
      - 記事内の具体的な記述でなく、一般的・客観的に判断できる文にする。  
      - 問題文中に選択肢を含める必要はない
      - 正答は選択肢を0始まりの連番で示した時の番号の配列で表す

---

5. 問題数・難易度  
   - 記事のテーマや関連する分野を考慮して、バランスよく8～12問程度の問題を作成する。  
   - 初級～中級程度の読者を想定し、基本事項の確認から応用力を問うまで、難易度に幅を持たせる。 
   - 記事未読でも取り組める「基礎知識問題」や「事象の理解度確認問題」を中心に出題する。

---

6. 出力のフォーマット  
   - 各問題は分かりやすく番号を付けて提示する。  
   - 回答形式（ラジオボタン、チェックボックス、一行回答、テキストボックスなど）を明確に示す。  
   - それぞれの問題に対して、模範解答例または解説を併記する。  
   - 記事に言及している場合でも、記事内容に依存しすぎず、一般に通用する知識や事例を説明に取り入れる形にする。

---

7. その他の注意  
   - 「記事の中で取り上げられている～」「記事では～と述べられており」といった、記事の内容をそのまま問う設問は作成しない。  
   - 記事から得られるキーワードやトピックを参考に、そこから連想・発展した一般知識や応用問題を作る。  
   - 出来るだけ重複しない問いを作り、テーマの主要なポイントを網羅することを目指す。  
   - 「順序並び替え問題」は、ラジオボタン形式で4つ程度の順序パターンを提示する。  
   - 「正誤判定型（4択）」は、記事の具体的引用ではなく、一般的な表現で判断できる形にする。

---

### 問題形式例: 実際の問題はユーザー指定のURLから取得した内容を元に作成

#### 【4択問題】(ラジオボタン形式)
Q1.（問題文）  
「〇〇」という概念について、もっとも一般的に正しいとされる説明はどれでしょうか？  

1. 選択肢A  
2. 選択肢B  
3. 選択肢C  
4. 選択肢D  

回答形式: ラジオボタン  
正解: 3. 選択肢C  
解説: 選択肢Cが正しい理由を簡単に解説する。

---

#### 【自由記述】(テキストボックス形式)
Q2.（問題文）  
「〇〇」という課題を解決するためには、どのような手順や考え方が有効だと思いますか？ あなたの考えを簡単に述べてください。  

回答形式: テキストボックス（長文）  
解答例（モデルアンサー）:  
「～～という理由で、～～を実行することが効果的と考えます。…」

---

#### 【穴埋め問題】(一行回答形式)
Q3.（問題文）  
「〇〇」は一般的に「_____」な特徴を持つといわれています。空欄に入る言葉を答えてください。  

回答形式: 一行回答  
正解: 「YYYY」  
解説: 〇〇に関して、～～という特徴が広く認められています。

---

#### 【順序並び替え問題】(ラジオボタン形式)
Q4.（問題文）  
〇〇というプロセスは、一般的に次のような手順を踏むときれいに進められます。どの順序が最も適切でしょうか？  

1. (a) A → B → C  
2. (b) B → A → C  
3. (c) A → C → B  
4. (d) C → A → B  

回答形式: ラジオボタン  
正解: 2. (b) B → A → C  
解説: 一般に、まずBで状況を把握し、次にAで～を行い、最後にCで～を仕上げるのが合理的です。

---

#### 【ケーススタディ・シミュレーション】(テキストボックス形式/複数選択)
Q5.（問題文）  
あなたが〇〇の現場を想定したとき、予想される問題点やリスクには何があり、どのように対処すべきだと考えますか？  

回答形式: テキストボックス（長文推奨）または複数チェックボックス  
解答例（モデルアンサー）:  
「まず～～を実施し、その後～～を検討することでリスクを軽減することができます。…」

---

#### 【正誤判定型（4択）】(ラジオボタン形式)
Q6.（問題文）  
以下の文に関して、正しいと言えるものをすべて選んでください。

1. 〇〇は～～である。
2. XXはYYの一部である。
3. AAAはBBBと言われている
4. 〇〇はXXXだ。

回答形式: ラジオボタン  
正解: 2, 3.
解説: なぜそうなるのか、簡単に説明を入れる。

---

上記フォーマットを参考に、記事を読んでいなくても問題文だけで解答できるようなヒント・背景情報を盛り込み、学習者がテーマの基礎～応用を理解し、考えを深められるような問題を作成してください。  
以上のガイドラインに従って出力を行ってください。
`;
