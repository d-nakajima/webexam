import { Card, CardContent } from "@/_lib/shadcn/components/ui/card";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import { Link } from "@/_lib/i18n/routing";
import { Button } from "@/app/_shadcn/components/ui/button";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import { AnswerType, QuestionType } from "@/app/_shared";
import ExamAnswerHistory from "../ExamAnswerHistory";
import ExamIndex from "../ExamIndex";
import ExamIndexItem from "../ExamIndex/ExamIndexItem";
import ExamLayout from "../ExamLayout";
import ExamQuestionList from "../ExamQuestionList";
import ExamQuestionListItem from "../ExamQuestionList/ExamQuestionListItem";

type PageContentProps = {
  answer: ReadDoc<AnswerType>;
};

export default function AnswerPageContent(props: PageContentProps) {
  const answer = props.answer;
  const examId = answer.examId;

  const isSelectQuestion = (question: QuestionType) => {
    return (
      question.type === "single_select" || question.type === "multi_select"
    );
  };
  return (
    <ExamLayout
      left={
        <ExamIndex>
          {answer.examData.questions.map((question, index) => {
            const grades = answer.grades[index];
            return (
              <ExamIndexItem
                key={index}
                id={`${index}`}
                number={index + 1}
                title={question.title}
                gradeRate={grades?.rate}
              />
            );
          })}
        </ExamIndex>
      }
      right={
        <>
          <ExamAnswerHistory examId={examId} />
          <Link href={examRoutePath(examId)} className="w-full">
            <Button className="w-full text-xs">もう一度回答する</Button>
          </Link>
        </>
      }
    >
      <div className="flex flex-col h-full">
        <Card className="mb-6 text-sm">
          <CardContent className="p-6">{answer.examData.abstract}</CardContent>
        </Card>
        <div className="flex-grow">
          <ExamQuestionList>
            {answer.examData.questions.map((question, index) => {
              const thisAnswer = answer.content[index];
              const props: Record<string, unknown> = {};
              if (question.type === "single_select") {
                props["answerIndex"] = Number(thisAnswer);
                props["correctAnswerIndex"] = Number(question.answer);
              } else if (question.type === "multi_select") {
                props["answerIndexes"] = thisAnswer.split(",").map(Number);
                props["correctAnswerIndexes"] = question.answer;
              } else {
                props["answer"] = thisAnswer;
                props["correctAnswer"] = question.answer;
              }

              return (
                <ExamQuestionListItem
                  key={index}
                  mode="view"
                  number={index + 1}
                  type={question.type}
                  title={question.title}
                  description={question.description}
                  options={
                    isSelectQuestion(question)
                      ? question.options.map((option) => option.text)
                      : []
                  }
                  gradeRate={answer.grades[index]?.rate}
                  {...props}
                  comment={answer.grades[index]?.comment}
                />
              );
            })}
          </ExamQuestionList>
        </div>
      </div>
    </ExamLayout>
  );
}
