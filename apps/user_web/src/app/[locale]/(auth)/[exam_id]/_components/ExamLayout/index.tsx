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
  return (
    <div className="flex gap-8 justify-around items-start py-5">
      <div className="shrink-0 sticky top-[calc(var(--header-height)+20px)]">
        {props.left}
      </div>
      <div className="flex-grow max-w-xl">{props.children}</div>
      <div className="shrink-0 sticky top-[calc(var(--header-height)+20px)]">
        {props.right}
      </div>
    </div>
  );
}
