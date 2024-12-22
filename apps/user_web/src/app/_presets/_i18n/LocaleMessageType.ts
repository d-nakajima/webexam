// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LocaleMessageType = {
  metadata: {
    title: string;
    description: string;
    ogp: {
      title: string;
      description: string;
      image: string;
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
};
