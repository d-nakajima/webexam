type Props = {
  children: React.ReactNode;
  params: { locale: string; exam_id: string };
};

export default function ExamLayout(props: Props) {
  return <div className="h-full flex justify-around">{props.children}</div>;
}
