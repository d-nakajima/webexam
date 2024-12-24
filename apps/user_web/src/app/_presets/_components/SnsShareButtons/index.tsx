"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import NoteIcon from "./note.png";

import { LinkIcon } from "lucide-react";
import { useToast } from "@/_lib/shadcn/hooks/use-toast";
import AppImage from "@/app/_presets/_components/AppImage";
import { getVercelOrigin } from "../../_utils/url";
import { useLocale } from "next-intl";

type Props = { hashtags?: string[] } & ({ url: string } | { path: string });

export default function ShareButtons(props: Props) {
  const locale = useLocale();
  let url: string;
  if ("url" in props) {
    url = props.url;
  } else if ("path" in props) {
    url = props.path ? `${getVercelOrigin()}/${locale}/${props.path}` : "";
  } else {
    throw new Error("url is empty");
  }

  return (
    <div className="text-sm flex gap-10 w-full justify-center my-5 h-10">
      <ButtonWrapper disabled={!url}>
        <TwitterShareButton url={url + "\n\n"} hashtags={props.hashtags}>
          <TwitterIcon round size="48" />
        </TwitterShareButton>
      </ButtonWrapper>
      <ButtonWrapper disabled={!url}>
        <FacebookShareButton url={url}>
          <FacebookIcon round size="48" />
        </FacebookShareButton>
      </ButtonWrapper>
      <ButtonWrapper disabled={!url}>
        <NoteShareButton url={url} hashtags={props.hashtags} />
      </ButtonWrapper>
      <ButtonWrapper disabled={!url}>
        <CopyUrlButton url={url} />
      </ButtonWrapper>
    </div>
  );
}

type NoteShareButtonProps = {
  url: string;
  hashtags?: string[];
};
function NoteShareButton(props: NoteShareButtonProps) {
  let href = `https://note.com/intent/post?url=${encodeURIComponent(
    props.url
  )}`;
  if (props.hashtags) {
    href += `&hashtags=${props.hashtags.map(encodeURIComponent).join(",")}`;
  }
  return (
    <a href={href} className="rounded-full h-10" target="_blank">
      <AppImage {...NoteIcon} alt="note" className="rounded-full h-12 w-12" />
    </a>
  );
}

type CopyUrlButtonProps = {
  url: string;
};

function CopyUrlButton(props: CopyUrlButtonProps) {
  const { toast } = useToast();
  const copy = () => {
    navigator.clipboard.writeText(props.url);
    toast({
      title: "Copied!",
      duration: 2000,
    });
  };
  return (
    <div
      className="rounded-full h-12 w-12 bg-gray-400 flex items-center justify-center cursor-pointer"
      onClick={copy}
    >
      <LinkIcon color="white" />
    </div>
  );
}

type ButtonWrapperProps = {
  children: React.ReactNode;
  disabled: boolean;
};
function ButtonWrapper(props: ButtonWrapperProps) {
  if (props.disabled) {
    return (
      <div className="opacity-50 cursor-not-allowed">
        <div className="pointer-events-none">{props.children}</div>
      </div>
    );
  } else {
    return <div className="hover:opacity-75">{props.children}</div>;
  }
}
