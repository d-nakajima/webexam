import { Button } from "@/app/_shadcn/components/ui/button";

import { ShareIcon } from "lucide-react";
import AuthBox from "./AuthBox";
import { cn } from "@/_lib/shadcn/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_shadcn/components/ui/dialog";

type Props = {
  title: string;
  shortTitle?: string;
  subtitle?: string;
  sharedDialogContent?: React.ReactNode;
};

export default function PageHeader(props: Props) {
  return (
    <div className={cn("flex items-center justify-start w-full h-full")}>
      <div className="flex-grow flex flex-col gap-0 p-2">
        <h1 className="font-bold leading-5 max-sm:hidden">{props.title}</h1>
        <h1 className="font-bold leading-5 sm:hidden">
          {props.shortTitle || props.title}
        </h1>
        <h2 className="text-xs font-bold opacity-75">{props.subtitle}</h2>
      </div>
      <div className="flex items-center p-2 gap-1">
        {props.sharedDialogContent && (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <ShareIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>{props.sharedDialogContent}</DialogContent>
          </Dialog>
        )}
        <AuthBox />
      </div>
    </div>
  );
}
