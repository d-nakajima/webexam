import ExamProvider from "./_providers/ExamProvider";

type Props = {
  children: React.ReactNode;
  params: { locale: string; exam_id: string };
};

export default async function ExamRootLayout(props: Props) {
  return (
    <ExamProvider id={props.params.exam_id}>{props.children}</ExamProvider>
  );
}
