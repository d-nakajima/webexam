"use client";

import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_shadcn/components/ui/dialog";
import { Input } from "@/app/_shadcn/components/ui/input";
import { Separator } from "@/app/_shadcn/components/ui/separator";
import { AnswerType } from "@/app/_shared";
import { useState } from "react";
import SearchResultItem from "./SearchResultItem";

type Props = {
  allAnswers: ReadDoc<AnswerType>[];
  children: React.ReactNode;
};

export default function SearchDialogContent(props: Props) {
  const { authUser } = useAuth();
  if (!authUser) throw new Error("User is not authenticated");

  const [text, setText] = useState("");
  const [result, setResult] = useState<ReadDoc<AnswerType>[]>(props.allAnswers);

  const textSearchFunc = (text: string) => {
    const _result = props.allAnswers.filter((answer) => {
      return [
        answer.examData.title,
        answer.examData.abstract,
        ...answer.examData.questions.map((question) => question.title),
      ].some((str) => str.includes(text));
    });

    setResult(_result);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <div className="p-2">
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              textSearchFunc(e.target.value);
            }}
            placeholder="キーワードで検索..."
            className="ring-0 focus-visible:ring-transparent outline-none border-none"
          />
        </div>
        <Separator />
        <div className="p-3 h-64 overflow-scroll">
          {result.length === 0 && (
            <div className="h-full flex items-center justify-center text-sm opacity-75 pb-6">
              該当する結果が見つかりませんでした
            </div>
          )}
          <div className="flex flex-col gap-2 h-full">
            {result.map((item) => (
              <SearchResultItem
                key={item.id}
                id={item.id}
                examId={item.examId}
                title={item.examData.title}
                date={item.createdAt}
                abstract={item.examData.abstract}
                score={item.score}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
