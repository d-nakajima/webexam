"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { getApp } from "firebase/app";

type Permissions = "granted" | "denied" | "default";

const useFcmToken = (uid: string) => {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState<Permissions>();

  useEffect(() => {
    if (token && uid) {
      addFcmToken(uid, token);
    }
  }, [token, uid]);

  const requestPermission = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(getApp());

        const permission = await Notification.requestPermission();
        setPermission(permission);

        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
          });
          if (currentToken) {
            setToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        }
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  const syncPermission = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const permission = Notification.permission;
        setPermission(permission);
        if (permission === "granted") {
          const messaging = getMessaging(getApp());
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY, // Replace with your Firebase project's VAPID key
          });
          setToken(currentToken);
        }
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    syncPermission();
  }, []);

  return { token, permission, requestPermission };
};

export default useFcmToken;

function addFcmToken(uid: string, token: string) {
  console.log(uid, token);
  throw new Error("Function not implemented.");
}
