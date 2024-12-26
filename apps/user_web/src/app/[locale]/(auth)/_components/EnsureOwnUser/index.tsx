"use client";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { notFound } from "next/navigation";

type Props = {
  userId: string;
  children: React.ReactNode;
};

export default function EnsureOwnUser(props: Props) {
  const { authUser } = useAuth();
  if (!authUser) notFound();

  if (authUser.uid !== props.userId) notFound();

  return <>{props.children}</>;
}
