import { Button } from "@/app/_shadcn/components/ui/button";

import { ExternalLinkIcon, ShareIcon } from "lucide-react";
import AuthBox from "./AuthBox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_shadcn/components/ui/dialog";
import { isUrl } from "@/app/_presets/_utils/url";

type Props = {
  title: string;
  shortTitle?: string;
  subtitle?: string;
  sharedDialogContent?: React.ReactNode;
};

export default function PageHeader(props: Props) {
  return (
    <div className="flex items-center justify-start w-full h-full max-w-full">
      <div className="flex-grow flex flex-col gap-0 px-2 min-w-0">
        <h1 className="font-bold leading-5 max-sm:hidden">{props.title}</h1>
        <h1 className="font-bold leading-5 sm:hidden">
          {props.shortTitle || props.title}
        </h1>
        {props.subtitle && (
          <h2 className="text-xs font-bold opacity-75 flex gap-1 items-center">
            <div className="min-w-0 text-ellipsis overflow-hidden whitespace-nowrap">
              {props.subtitle}
            </div>
            {isUrl(props.subtitle) && (
              <a href={props.subtitle} target="_blank">
                <ExternalLinkIcon size="12" />
              </a>
            )}
          </h2>
        )}
      </div>
      <div className="flex items-center p-2 gap-1 flex-shrink-0">
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
