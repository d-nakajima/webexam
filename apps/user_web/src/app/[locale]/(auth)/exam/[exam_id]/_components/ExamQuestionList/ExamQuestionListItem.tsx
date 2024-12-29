import { Checkbox } from "@/app/_shadcn/components/ui/checkbox";
import { Input } from "@/app/_shadcn/components/ui/input";
import { Label } from "@/app/_shadcn/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/_shadcn/components/ui/radio-group";
import { Textarea } from "@/app/_shadcn/components/ui/textarea";
import GradeSuspendedIcon from "./GradeSuspendedIcon";

type QuestionBase = {
  number: number;
  title: string;
  description?: string;
  mode: "view" | "edit";
  gradeRate?: number;
  comment?: string;
};

type SingleSelectQuestion = {
  type: "single_select";
  options: string[];
  correctAnswerIndex?: number;
  answerIndex?: number;
} & QuestionBase;

type MultiSelectQuestion = {
  type: "multi_select";
  options: string[];
  correctAnswerIndexes?: number[];
  answerIndexes?: number[];
} & QuestionBase;

type OneLineTextQuestion = {
  type: "line_text";
  correctAnswer?: string;
  answer?: string;
} & QuestionBase;

type FreeTextQuestion = {
  type: "free_text";
  correctAnswer?: string;
  answer?: string;
} & QuestionBase;

type Question =
  | SingleSelectQuestion
  | MultiSelectQuestion
  | OneLineTextQuestion
  | FreeTextQuestion;

type Props = Question;

export default function ExamQuestionListItem(props: Props) {
  let component: React.ReactNode;
  switch (props.type) {
    case "single_select":
      component = <SingleSelectQuestion {...props} />;
      break;
    case "multi_select":
      component = <MultiSelectQuestion {...props} />;
      break;
    case "line_text":
      component = <OneLineTextQuestion {...props} />;
      break;
    case "free_text":
      component = <FreeTextQuestion {...props} />;
      break;
  }

  return (
    <div className="flex items-start">
      <div className="flex-grow">
        <div className="flex font-bold items-center text-lg gap-1">
          <div className="text-sm w-4 -ml-5">
            {props.mode === "view" && (
              <GradeSuspendedIcon gradeRate={props.gradeRate} />
            )}
          </div>
          <div>{props.number}.</div>
          <div>{props.title}</div>
        </div>
        <div className="mt-2 text-sm">{props.description}</div>
        <div className="my-5">{component}</div>
        {props.mode === "view" && (
          <div className="my-2 text-sm bg-black border rounded-md py-2 px-3 whitespace-pre-wrap break-words w-full">
            {props.comment || "AI採点中..."}
          </div>
        )}
      </div>
    </div>
  );
}

function SingleSelectQuestion(props: SingleSelectQuestion) {
  const defaultValue =
    props.answerIndex !== undefined ? `${props.answerIndex}` : "";

  return (
    <RadioGroup
      defaultValue={defaultValue}
      name={`${props.number}`}
      className="flex flex-col gap-2"
    >
      {props.options.map((option, index) => {
        const additionalStyle =
          props.mode === "view"
            ? props.correctAnswerIndex === index
              ? "font-bold text-white"
              : "line-through opacity-70"
            : "";

        return (
          <div key={index} className="flex gap-2 items-center">
            <RadioGroupItem
              value={`${index}`}
              id={`${props.number}_${index}`}
              disabled={props.mode === "view"}
            />
            <Label
              className={`cursor-pointer ${additionalStyle}`}
              htmlFor={`${props.number}_${index}`}
            >
              {option}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}

function MultiSelectQuestion(props: MultiSelectQuestion) {
  const defaultValues = props.answerIndexes || [];

  return (
    <div className="flex flex-col gap-2">
      {props.options.map((option, index) => {
        const additionalStyle =
          props.mode === "view"
            ? props.correctAnswerIndexes &&
              props.correctAnswerIndexes.includes(index)
              ? "font-bold !opacity-100"
              : "line-through"
            : "";

        return (
          <div key={index} className="flex gap-2 items-center">
            <Checkbox
              id={`${props.number}_${index}`}
              defaultChecked={defaultValues.includes(index)}
              name={`${props.number}`}
              value={index}
              disabled={props.mode === "view"}
            />
            <Label
              className={`cursor-pointer ${additionalStyle}`}
              htmlFor={`${props.number}_${index}`}
            >
              {option}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

function OneLineTextQuestion(props: OneLineTextQuestion) {
  return (
    <div>
      <Input
        name={`${props.number}`}
        type="text"
        defaultValue={props.answer}
        disabled={props.mode === "view"}
      />
      {props.correctAnswer && props.mode === "view" && (
        <div className="text-sm mt-2">正答例: {props.correctAnswer}</div>
      )}
    </div>
  );
}

function FreeTextQuestion(props: FreeTextQuestion) {
  return (
    <div>
      <Textarea
        name={`${props.number}`}
        defaultValue={props.answer}
        disabled={props.mode === "view"}
      />
      {props.correctAnswer && props.mode === "view" && (
        <div className="text-sm mt-2">正答例: {props.correctAnswer}</div>
      )}
    </div>
  );
}
