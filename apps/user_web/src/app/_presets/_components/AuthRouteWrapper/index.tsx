"use client";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { useRouter } from "@/_lib/i18n/routing";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthRouteWrapper(props: Props) {
  const { authUser, isInitialized } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!authUser) {
      replace("/");
    }
  }, [authUser, isInitialized, replace]);

  return authUser ? props.children : <></>;
}
