type Props = {
  params: { locale: string; exam_id: string };
};

export default function ExamPage(props: Props) {
  const { locale, exam_id } = props.params;
  return (
    <div>
      Exam Page {locale} {exam_id}
    </div>
  );
}
