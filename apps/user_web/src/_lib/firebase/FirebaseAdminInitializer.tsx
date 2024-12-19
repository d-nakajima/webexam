import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { ReactNode } from "react";

// ====================================================================================
// base64エンコードされたSAをsecretに保存する必要があります
// ====================================================================================
// chromeのdevtoolでのbase64エンコード方法
// json = {}
// btoa(JSON.stringify(json))
// ADMIN_SDK_SERVICE_ACCOUNT_KEY_BASE64=XXXXXX

type Props = {
  children: ReactNode;
};

export default async function FirebaseAdminInitializer(props: Props) {
  try {
    initializeAdminSdk();
  } catch (_e) {
    const e = _e as Error;
    if ((e?.message as string).includes("already exists")) {
      // ignore
    } else {
      console.error(e);
    }
  }

  return props.children;
}

export function initializeAdminSdk() {
  try {
    const key = Buffer.from(
      process.env.ADMIN_SDK_SERVICE_ACCOUNT_KEY_BASE64,
      "base64"
    ).toString("utf8");
    const credentials = JSON.parse(key);

    initializeApp({
      credential: credential.cert(credentials),
    });
  } catch (_e) {
    const e = _e as Error;
    if ((e?.message as string).includes("already exists")) {
      // ignore
    } else {
      console.error(e);
    }
  }
}
