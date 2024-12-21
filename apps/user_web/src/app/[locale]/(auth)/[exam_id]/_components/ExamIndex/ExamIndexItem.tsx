"use client";

import { Link } from "@/_lib/i18n/routing";
import { Button } from "@/app/_shadcn/components/ui/button";

type Props = {
  id: string;
  number: number;
  title: string;
};

export default function ExamIndexItem(props: Props) {
  return (
    <div className="flex text-xs my-1">
      <span className="w-4 shrink-0">{`${props.number}.`}</span>
      <Link
        href={`#${props.id}`}
        className="whitespace-pre-wrap break-words overflow-hidden w-min"
      >
        {props.title}
      </Link>
    </div>
  );
}
