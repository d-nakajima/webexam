import ExamAnswerHistory from "./_components/ExamAnswerHistory";
import ExamAnswerHistoryItem from "./_components/ExamAnswerHistory/ExamAnswerHistoryItem";
import ExamIndex from "./_components/ExamIndex";
import ExamIndexItem from "./_components/ExamIndex/ExamIndexItem";
import ExamLayout from "./_components/ExamLayout";
import ExamQuestionList from "./_components/ExamQuestionList";
import ExamQuestionListItem from "./_components/ExamQuestionList/ExamQuestionListItem";

type Props = {
  params: { locale: string; exam_id: string };
};

export default async function ExamPage(_props: Props) {
  return (
    <ExamLayout
      left={
        <ExamIndex>
          <ExamIndexItem id={"1"} number={1} title={"test"} />
          <ExamIndexItem id={"1"} number={1} title={"test"} />
          <ExamIndexItem id={"1"} number={1} title={"test"} />
          <ExamIndexItem id={"1"} number={1} title={"test"} />
          <ExamIndexItem id={"1"} number={1} title={"test"} />
        </ExamIndex>
      }
      right={
        <ExamAnswerHistory>
          <ExamAnswerHistoryItem date={new Date()} score={10} />
          <ExamAnswerHistoryItem date={new Date()} score={10} />
        </ExamAnswerHistory>
      }
    >
      <div>
        <ExamQuestionList>
          <ExamQuestionListItem
            mode="edit"
            number={1}
            type="line_text"
            title="line text."
            description="line text.line text.line text.line text.line text.line text.line text.line text."
            comment="comment. comment. comment. comment. comment. comment. comment. comment. comment. comment. "
          />
          <ExamQuestionListItem
            mode="edit"
            number={2}
            type="free_text"
            title="free text"
          />
          <ExamQuestionListItem
            mode="edit"
            number={3}
            type="single_select"
            options={["option 1", "option 2", "option 3", "option 4"]}
            title="single text"
            answerIndex={1}
          />
          <ExamQuestionListItem
            mode="edit"
            number={4}
            type="multi_select"
            options={["option 1", "option 2", "option 3", "option 4"]}
            title="multi text"
          />
          <ExamQuestionListItem
            mode="edit"
            number={4}
            type="multi_select"
            options={["option 1", "option 2", "option 3", "option 4"]}
            title="multi text"
          />
          <ExamQuestionListItem
            mode="edit"
            number={4}
            type="multi_select"
            options={["option 1", "option 2", "option 3", "option 4"]}
            title="multi text"
          />
          <ExamQuestionListItem
            mode="edit"
            number={4}
            type="multi_select"
            options={["option 1", "option 2", "option 3", "option 4"]}
            title="multi text"
          />
        </ExamQuestionList>
      </div>
    </ExamLayout>
  );
}
