"use client";

import ExamAnswerHistoryItem from "./ExamAnswerHistoryItem";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/app/_shadcn/components/ui/select";
import { HistoryIcon } from "lucide-react";
import { answerRoutePath } from "@/app/_presets/_utils/route_builder";
import { Link } from "@/_lib/i18n/routing";
import { Button } from "@/app/_shadcn/components/ui/button";
import { useUserAnswers } from "@/app/[locale]/(auth)/_providers/UserAnswersProvider";

type Props = {
  examId: string;
};

export default function ExamAnswerHistory(props: Props) {
  const { answers } = useUserAnswers();
  const examAnswers = answers.filter(
    (answer) => answer.examId === props.examId
  );

  return (
    <Select>
      <SelectTrigger hideIcon={true} className="flex justify-center gap-2 p-2">
        <div className="text-xs">過去の回答</div>
        <HistoryIcon size="16" />
      </SelectTrigger>
      <SelectContent className="px-0 py-1">
        <div className="px-2 py-1">
          {examAnswers.map((answer) => (
            <Link
              href={answerRoutePath(props.examId, answer.id)}
              key={answer.id}
            >
              <Button variant="ghost" asChild>
                <ExamAnswerHistoryItem
                  date={answer.createdAt}
                  score={answer.score}
                />
              </Button>
            </Link>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
