import ExamAnswerHistoryItem from "./ExamAnswerHistoryItem";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/app/_shadcn/components/ui/select";
import { HistoryIcon } from "lucide-react";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";
import { listUserExamAnswerHistory } from "@/app/_presets/_repositories/adminFirestore";
import { userExamAnswerHistoryCacheTag } from "@/app/_presets/_utils/cache";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { answerRoutePath } from "@/app/_presets/_utils/route_builder";
import { Link } from "@/_lib/i18n/routing";
import { Button } from "@/app/_shadcn/components/ui/button";

type Props = {
  examId: string;
};

export default async function ExamAnswerHistory(props: Props) {
  const auth = await getServerAuthUser();
  if (!auth) return notFound();

  const cacheListUserExamAnswerHistory = unstable_cache(
    (userId: string, examId: string) =>
      listUserExamAnswerHistory(userId, examId),
    [],
    {
      tags: [userExamAnswerHistoryCacheTag(auth.uid, props.examId)],
    }
  );

  const userExamAnswerHistory = await cacheListUserExamAnswerHistory(
    auth.uid,
    props.examId
  );

  return (
    <Select>
      <SelectTrigger hideIcon={true} className="flex justify-center gap-2 p-2">
        <div className="text-xs">過去の回答</div>
        <HistoryIcon size="16" />
      </SelectTrigger>
      <SelectContent className="px-0 py-1">
        <div className="px-2 py-1">
          {userExamAnswerHistory.map((history) => (
            <Link
              href={answerRoutePath(props.examId, history.id)}
              key={history.id}
            >
              <Button variant="ghost" asChild>
                <ExamAnswerHistoryItem
                  date={history.createdAt}
                  score={history.score}
                />
              </Button>
            </Link>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
