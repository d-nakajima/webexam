"use client";

import { Button } from "@/app/_shadcn/components/ui/button";
import {
  SidebarTrigger,
  useSidebar,
} from "@/app/_shadcn/components/ui/sidebar";
import { FilePlusIcon, SearchIcon, SidebarIcon } from "lucide-react";
import SearchDialog from "../SearchDialog";
import { Link } from "@/_lib/i18n/routing";

type Props = object;

export default function SidebarTop(_props: Props) {
  const { open } = useSidebar();

  return (
    <div
      className="flex items-center h-full transition-all ease-linear md:w-[var(--sidebar-width)]"
      style={{
        width: open ? undefined : "108px",
      }}
    >
      <Button asChild size="icon" variant="ghost">
        <SidebarTrigger>
          <SidebarIcon size={16} />
        </SidebarTrigger>
      </Button>
      <span className="flex-grow" />
      <SearchDialog>
        <Button size="icon" variant="ghost">
          <SearchIcon size={16} />
        </Button>
      </SearchDialog>
      <Link href="/">
        <Button size="icon" variant="ghost">
          <FilePlusIcon size={16} />
        </Button>
      </Link>
    </div>
  );
}
