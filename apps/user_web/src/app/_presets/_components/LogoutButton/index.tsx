"use client";

import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function LogoutButton(props: Props) {
  const { logout } = useAuth();

  return (
    <div
      className={props.className}
      onClick={() =>
        logout({
          reload: true,
        })
      }
    >
      {props.children || "Logout"}
    </div>
  );
}
