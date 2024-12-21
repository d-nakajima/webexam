"use client";

import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import AppImage from "@/app/_presets/_components/AppImage";
import { Skeleton } from "@/app/_shadcn/components/ui/skeleton";
import Avatar from "boring-avatars";
import { User as AuthUser } from "firebase/auth";
import {
  ChartNoAxesCombinedIcon,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/app/_shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
          <DropdownMenuItem>
            <LogIn />
            <span>Sign in / Sign up</span>
          </DropdownMenuItem>
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
