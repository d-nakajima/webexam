import { type LocaleMessageType } from "./LocaleMessageType";

const message: LocaleMessageType = {
  validation: {
    exam: {
      invalid_url: "invalid url",
    },
  },
  metadata: {
    title: "WebExam",
    description: "Check and deepen your understanding of web articles.",
    ogp: {
      title: "WebExam",
      description: "Check and deepen your understanding of web articles.",
    },
  },
  pwa: {
    name: "WebExam",
    shortName: "WebExam",
    description: "Check and deepen your understanding of web articles.",
  },
  auth: {
    already_have_account: "already have account.",
  },
  top: {
    form: {
      placeholder: "Enter the URL of the article...",
    },
    how_to_use: {
      intro: "Unsure if you truly understand?",
      title: "WebExam helps you check and reinforce your learning!",
      step1: {
        title: "Add a URL",
        description:
          "Enter the URL of the page you want to generate questions for!",
      },
      step2: {
        title: "Answer questions",
        description: "Try answering the AI-generated questions!",
      },
      step3: {
        title: "Review & improve",
        description: "Go back to the article to clarify any uncertain points!",
      },
    },
  },
};

export default message;
