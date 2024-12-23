type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
};

export default function ExamLayout(props: Props) {
  // Grid layout for exam page
  return (
    <div className="grid grid-cols-[repeat(2,80px)_repeat(8,minmax(0,60px))_repeat(2,80px)] gap-12 items-start justify-center my-5 mx-10">
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2">
        {props.left}
      </div>
      <div className="col-span-8 w-full h-full min-h-[calc(100vh-40px-var(--header-height))] max-w-3xl m-auto">
        {props.children}
      </div>
      <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2">
        {props.right}
      </div>
    </div>
  );
}
