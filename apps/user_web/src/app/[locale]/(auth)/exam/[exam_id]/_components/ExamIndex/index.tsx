type Props = {
  children: React.ReactNode;
};

export default async function ExamIndex(props: Props) {
  return <div className="p-3 border rounded-md ">{props.children}</div>;
}
