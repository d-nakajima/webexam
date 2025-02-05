// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LocaleMessageType = {
  validation: {
    exam: {
      invalid_url: string;
    };
  };
  metadata: {
    title: string;
    description: string;
    ogp: {
      title: string;
      description: string;
    };
  };
  pwa: {
    name: string;
    shortName: string;
    description: string;
  };
  auth: {
    already_have_account: string;
  };
  top: {
    form: {
      placeholder: string;
    };
    how_to_use: {
      intro: string;
      title: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
    };
  };
};
