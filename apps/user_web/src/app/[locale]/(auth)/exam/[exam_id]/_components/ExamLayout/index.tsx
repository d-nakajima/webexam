type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
};

export default function ExamLayout(props: Props) {
  // Grid layout for exam page
  return (
    <div className="grid grid-cols-12 gap-6 items-start justify-center my-5 mx-10 w-auto">
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2">
        {props.left}
      </div>
      <div className="col-span-8 w-full">{props.children}</div>
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2">
        {props.right}
      </div>
    </div>
  );
}
