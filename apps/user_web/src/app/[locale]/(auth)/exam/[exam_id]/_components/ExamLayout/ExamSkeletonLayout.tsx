import { Skeleton } from "@/_lib/shadcn/components/ui/skeleton";
import ExamLayout from ".";

export default function ExamSkeletonLayout() {
  return (
    <ExamLayout
      left={<Skeleton className="w-full h-10" />}
      right={
        <>
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </>
      }
    >
      <Skeleton className="w-full h-full" />
    </ExamLayout>
  );
}
