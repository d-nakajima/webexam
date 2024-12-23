type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
};

export default function ExamLayout(props: Props) {
  // Grid layout for exam page
  return (
    <div className="grid  grid-cols-[repeat(2,80px)_repeat(8,minmax(0,60px))_repeat(2,80px)] gap-col-12 items-start justify-center my-5 mx-10 max-xl:grid-cols-[repeat(2,80px)_repeat(8,minmax(0,60px))] max-sm:grid-cols-1">
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2 max-sm:relative max-sm:top-0">
        {props.left}
        <div className="xl:hidden my-10 max-sm:my-5">{props.right}</div>
      </div>
      <div className="col-span-8 w-full h-full min-h-[calc(100vh-40px-var(--header-height))] max-w-3xl m-auto">
        {props.children}
      </div>
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2 max-xl:hidden">
        {props.right}
      </div>
    </div>
  );
}
