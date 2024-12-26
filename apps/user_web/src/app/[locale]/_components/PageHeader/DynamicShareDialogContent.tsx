"use client";

import { usePathname } from "@/_lib/i18n/routing";
import HomeShareDialogContent from "../HomeShareDialogContent";
import { examBasePath } from "@/app/_presets/_utils/route_builder";
import ShareAnswerDialogContent from "../../(auth)/exam/[exam_id]/[answer_id]/_components/ShareAnswerDialogContent";
import ExamShareDialogContent from "../../(auth)/exam/[exam_id]/_components/ExamShareDialogContent";

export default function DynamicShareDialogContent() {
  const path = usePathname(); // without locale

  if (path.startsWith(examBasePath())) {
    const [examId, answerId] = path.split("/").slice(2);
    if (answerId) {
      return (
        <ShareAnswerDialogContent
          id={answerId}
          examId={examId}
          answerId={answerId}
        />
      );
    } else if (examId) {
      return <ExamShareDialogContent id={examId} />;
    }
  }

  return <HomeShareDialogContent />;
}
