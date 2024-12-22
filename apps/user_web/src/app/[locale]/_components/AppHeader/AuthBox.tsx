"use client";

import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import AppImage from "@/app/_presets/_components/AppImage";
import { Skeleton } from "@/app/_shadcn/components/ui/skeleton";
import Avatar from "boring-avatars";
import { User as AuthUser } from "firebase/auth";
import { ChartNoAxesCombinedIcon, LogOut, Settings } from "lucide-react";
import GoogleIcon from "./_images/google.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_shadcn/components/ui/dropdown-menu";

export default function AuthBox() {
  const { authUser } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Thumbnail authUser={authUser} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{authUser?.email ?? "Guest"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <ChartNoAxesCombinedIcon />
            <span>Analytics</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {authUser?.isAnonymous ? (
          <>
            <DropdownMenuLabel>Sign in / Sign up</DropdownMenuLabel>
            <DropdownMenuItem>
              <AppImage {...GoogleIcon} className="w-4 h-4" alt="google" />
              <span>Googleでログイン</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ThumbnailProps = {
  authUser: AuthUser | null;
};

function Thumbnail({ authUser }: ThumbnailProps) {
  if (!authUser) return <Skeleton className="w-8 h-8 rounded-full" />;

  if (authUser.photoURL) {
    return (
      <AppImage
        src={authUser.photoURL}
        alt={authUser.displayName ?? authUser.uid}
        height={32}
        width={32}
        className="w-8 h-8 rounded-full"
      />
    );
  } else {
    return <Avatar name={authUser.uid} size={32} variant="beam" />;
  }
}
