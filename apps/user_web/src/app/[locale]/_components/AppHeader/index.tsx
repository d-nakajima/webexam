import { Button } from "@/app/_shadcn/components/ui/button";
import {
  SidebarTrigger,
  useSidebar,
} from "@/app/_shadcn/components/ui/sidebar";
import { FilePlusIcon, SearchIcon, ShareIcon, SidebarIcon } from "lucide-react";
import SidebarTop from "./SidebarTop";
import AuthBox from "./AuthBox";

type Props = {
  title: string;
  subtitle?: string;
};

export default function AppHeader(props: Props) {
  return (
    <div className="flex items-center justify-start w-full h-full">
      <SidebarTop />
      <div className="flex-grow flex flex-col gap-0 p-2">
        <h1 className="font-bold leading-5">{props.title}</h1>
        <h2 className="text-xs font-bold opacity-75">{props.subtitle}</h2>
      </div>
      <div className="flex items-center p-2 gap-1">
        <Button size="icon" variant="ghost">
          <ShareIcon />
        </Button>
        <AuthBox />
      </div>
    </div>
  );
}
