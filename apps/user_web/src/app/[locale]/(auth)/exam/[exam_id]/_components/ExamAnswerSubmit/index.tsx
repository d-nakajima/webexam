"use client";
import { useAuth } from "@/_lib/firebase/FirebaseAuthProvider";
import { ReadDoc } from "@/_lib/firebase/ReadDoc";
import { submitAnswer } from "@/app/_presets/_repositories/clientFirestore";
import { Button } from "@/app/_shadcn/components/ui/button";
import { AnswerType, ExamType } from "@/app/_shared";

type Props = {
  exam: ReadDoc<ExamType>;
};

export default function ExamAnswerSubmit(props: Props) {
  const { authUser } = useAuth();

  if (!authUser) return null;
  const onSubmit = () => {
    const answers: string[] = [];
    props.exam.questions.forEach((question, index) => {
      if (question.type === "single_select") {
        const answer = document.querySelector(
          `input[name="${index + 1}"]:checked`
        ) as HTMLInputElement;
        answers.push(answer.value);
      } else if (question.type === "multi_select") {
        const answer = document.querySelectorAll(
          `input[name="${index + 1}"]:checked`
        ) as NodeListOf<HTMLInputElement>;
        answers.push(
          Array.from(answer)
            .map((a) => a.value)
            .join(",")
        );
      } else {
        const answer = document.querySelector(
          `*[name="${index + 1}"]`
        ) as HTMLInputElement;
        answers.push(answer.value);
      }
    });

    const answer: AnswerType = {
      userId: authUser.uid,
      examId: props.exam.id,
      examData: props.exam,
      status: "answered",
      isPublish: false,
      content: answers,
      grades: [],
    };

    submitAnswer(answer);
  };
  return (
    <Button type="button" onClick={onSubmit}>
      Submit
    </Button>
  );
}
