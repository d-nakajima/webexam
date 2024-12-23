"use client";
import ShareButtons from "@/app/_presets/_components/SnsShareButtons";
import { publishAnswer } from "@/app/_presets/_repositories/clientFirestore";
import {
  answerRoutePath,
  examRoutePath,
} from "@/app/_presets/_utils/route_builder";
import { DialogTitle } from "@/app/_shadcn/components/ui/dialog";
import { Separator } from "@/app/_shadcn/components/ui/separator";
import { Switch } from "@/app/_shadcn/components/ui/switch";
import { useState } from "react";

type Props = {
  id: string;
  examId: string;
  isPublish: boolean;
};

export default function ShareAnswerDialogContent(props: Props) {
  const [url, setUrl] = useState(
    props.isPublish ? answerRoutePath(props.examId, props.id) : ""
  );

  const publish = async () => {
    await publishAnswer(props.id);
    setUrl(answerRoutePath(props.examId, props.id));
  };

  const unpublish = async () => {
    await publishAnswer(props.id);
    setUrl("");
  };

  return (
    <>
      <DialogTitle>問題だけをシェアする</DialogTitle>
      <div className="text-xs">
        問題を友達に共有して、一緒に解くことができます
      </div>
      <div>
        <ShareButtons url={examRoutePath(props.examId)} />
      </div>
      <Separator />
      <div className="flex gap-5 text-xs items-center">
        <div className="flex-grow">
          <DialogTitle>問題・回答をシェア</DialogTitle>
          <div className="mt-3">
            回答をシェアする場合、公開状態にする必要があります
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <span>公開する</span>
          <Switch
            defaultChecked={props.isPublish}
            className="data-[state=unchecked]:bg-opacity-80"
            onCheckedChange={(isChecked) => {
              if (isChecked) {
                publish();
              } else {
                unpublish();
              }
            }}
          />
        </div>
      </div>
      <div>
        <ShareButtons url={url} />
      </div>
    </>
  );
}
