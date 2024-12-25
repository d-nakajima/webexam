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
};

export default message;
