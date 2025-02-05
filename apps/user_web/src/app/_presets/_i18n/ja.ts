import { type LocaleMessageType } from "./LocaleMessageType";

const message: LocaleMessageType = {
  validation: {
    exam: {
      invalid_url: "URLが不正です",
    },
  },
  metadata: {
    title: "WebExam",
    description:
      "Web上の情報から自動でテストを作成し、情報に対する理解を確認し、深めるためのツールです。",
    ogp: {
      title: "WebExam",
      description: "Webの記事に対する理解を確認し、深めるためのツールです。",
    },
  },
  pwa: {
    name: "WebExam",
    shortName: "WebExam",
    description: "Webの記事に対する理解を確認し、深めるためのツールです。",
  },
  auth: {
    already_have_account: "すでにアカウントが存在しています。",
  },
  top: {
    form: {
      placeholder: "記事URLを入力してください...",
    },
    how_to_use: {
      intro: "「webでの勉強」本当に理解できているか不安…",
      title: "WebExamが理解の確認・定着をサポート！",
      step1: {
        title: "URLを登録",
        description: "問題を作成したいページのURLを登録しましょう！",
      },
      step2: {
        title: "問題に回答",
        description: "AIによって作成された問題に回答しましょう！",
      },
      step3: {
        title: "確認と復習",
        description: "理解が曖昧なところは記事に戻って確認しましょう！",
      },
    },
  },
};

export default message;
