"use client";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import ShareButtons from "@/app/_presets/_components/SnsShareButtons";
import {
  listenOwnAnswer,
  publishAnswer,
  unpublishAnswer,
} from "@/app/_presets/_repositories/clientFirestore";
import { revalidateAnswerCache } from "@/app/_presets/_utils/cache";
import {
  answerRoutePath,
  examRoutePath,
} from "@/app/_presets/_utils/route_builder";
import { DialogTitle } from "@/app/_shadcn/components/ui/dialog";
import { Separator } from "@/app/_shadcn/components/ui/separator";
import { Switch } from "@/app/_shadcn/components/ui/switch";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  examId: string;
  answerId: string;
};

export default function ShareAnswerDialogContent(props: Props) {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("user is not authenticated");

  const [isPublish, setIsPublish] = useState(false);
  const answerSharedPath = answerRoutePath(props.examId, props.id);

  useEffect(() => {
    return listenOwnAnswer(props.answerId, authUser.uid, (answer) => {
      if (!answer) return;
      setIsPublish(answer.isPublish);
    });
  }, []);

  const publish = async () => {
    await publishAnswer(props.id);
    revalidateAnswerCache(props.id, props.examId);
  };

  const unpublish = async () => {
    await unpublishAnswer(props.id);
    revalidateAnswerCache(props.id, props.examId);
  };

  return (
    <>
      <DialogTitle>問題だけをシェアする</DialogTitle>
      <div className="text-xs">
        問題を友達に共有して、一緒に解くことができます
      </div>
      <div>
        <ShareButtons path={examRoutePath(props.examId)} />
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
            checked={isPublish}
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
        <ShareButtons path={isPublish ? answerSharedPath : ""} />
      </div>
    </>
  );
}
