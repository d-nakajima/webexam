import { Button } from "@/app/_shadcn/components/ui/button";
import { SidebarTrigger } from "@/app/_shadcn/components/ui/sidebar";
import { FilePlusIcon, SearchIcon, SidebarIcon } from "lucide-react";
import SearchDialog from "../SearchDialog";
import { Link } from "@/_lib/i18n/routing";
import SidebarTopLayout from "./SidebarTopLayout";

type Props = object;

export default async function SidebarTop(_props: Props) {
  return (
    <SidebarTopLayout>
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
    </SidebarTopLayout>
  );
}
