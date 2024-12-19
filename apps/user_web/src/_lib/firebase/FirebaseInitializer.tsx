"use client";

import { ReactNode, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

type Props = {
  children: ReactNode;
};

export default function FirebaseInitializer(props: Props) {
  try {
    initializeApp(firebaseConfig);
  } catch (e: any) {
    if (!e.message.includes("Firestore has already been started")) {
      throw new Error(e.message + "a");
    }
  }

  const auth = getAuth();
  const functions = getFunctions();
  const firestore = getFirestore();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) getAnalytics();
    if (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY) getMessaging();
  }, []);

  functions.region = "asia-northeast1";

  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
    console.log("emulators");
    setupEmulators({ auth, functions, firestore });
  }

  return props.children;
}

async function setupEmulators({
  auth,
  functions,
  firestore,
}: {
  auth: ReturnType<typeof getAuth>;
  functions: ReturnType<typeof getFunctions>;
  firestore: ReturnType<typeof getFirestore>;
}) {
  // Firebase: Error (auth/emulator-config-failed). を避けるため、事前にauthUrlをfetchしておく
  // https://dev.to/ilumin/fix-firebase-error-authemulator-config-failed-mng
  const authUrl = "http://localhost:9099";
  await fetch(authUrl);
  try {
    connectAuthEmulator(auth, authUrl, {
      disableWarnings: true,
    });
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectFirestoreEmulator(firestore, "localhost", 8080);
  } catch (e: any) {
    if (e.message.includes("Firebase: Error (auth/emulator-config-failed)")) {
    } else {
      console.error("emulator error", e);
    }
  }
}
