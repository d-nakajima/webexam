"use client";
import { Button } from "@/app/_shadcn/components/ui/button";
import {
  SidebarTrigger,
  useSidebar,
} from "@/app/_shadcn/components/ui/sidebar";
import { FilePlusIcon, SearchIcon, SidebarIcon, X } from "lucide-react";

type Props = {};

export default function SidebarTop(props: Props) {
  const { open } = useSidebar();

  return (
    <div
      className="flex items-center h-full transition-all ease-linear"
      style={{
        width: open ? "var(--sidebar-width)" : "108px",
      }}
    >
      <Button asChild size="icon" variant="ghost">
        <SidebarTrigger>
          <SidebarIcon size={16} />
        </SidebarTrigger>
      </Button>
      <span className="flex-grow" />
      <Button size="icon" variant="ghost">
        <SearchIcon size={16} />
      </Button>
      <Button size="icon" variant="ghost">
        <FilePlusIcon size={16} />
      </Button>
    </div>
  );
}
