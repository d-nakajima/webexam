type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
};

export default function ExamLayout(props: Props) {
  return (
    <div>
      <div className="grid grid-cols-[repeat(2,80px)_repeat(8,minmax(0,60px))_repeat(2,80px)] gap-x-10 items-start justify-center my-5 mx-10 max-sm:grid-cols-1 max-xl:grid-cols-[repeat(2,80px)_repeat(8,minmax(0,60px))]">
        <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2 max-sm:relative  max-sm:col-span-1">
          {props.left}
          <div className="xl:hidden my-10 max-sm:my-5 flex flex-col gap-4">
            {props.right}
          </div>
        </div>
        <div className="relative col-span-8 top-[calc(var(--header-height))] w-full h-full min-h-[calc(100vh-40px-var(--header-height))] max-w-2xl m-auto max-sm:col-span-1 max-sm:mt-5">
          {props.children}
        </div>
        <div className="sticky top-[calc(var(--header-height)+20px)] col-span-2 max-xl:hidden flex flex-col gap-4">
          {props.right}
        </div>
      </div>
    </div>
  );
}
