import { cn } from "@/_lib/shadcn/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ErrorMessage({ children, className }: Props) {
  return (
    <div className={cn("text-destructive text-sm mt-1", className)}>
      {children}
    </div>
  );
}
