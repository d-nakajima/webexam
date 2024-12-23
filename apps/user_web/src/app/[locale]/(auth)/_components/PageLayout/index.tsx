"use client";
import { cn } from "@/_lib/shadcn/utils";
import PageHeader from "@/app/[locale]/_components/PageHeader";
import { useSidebar } from "@/app/_shadcn/components/ui/sidebar";

type Props = {
  title: string;
  shortTitle?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageLayout(props: Props) {
  const { open, isMobile } = useSidebar();
  const { children, ...headerProps } = props;
  return (
    <div className="w-full">
      <div
        className={cn(
          "fixed top-0 right-0 left-0 w-full p-1 h-[var(--header-height)] bg-header transition-all ease-linear duration-200 pl-[var(--sidebar-width)]",
          isMobile || !open ? "pl-[var(--sidebar-top-collapse-width)]" : ""
        )}
      >
        <PageHeader {...headerProps} />
      </div>
      {children}
    </div>
  );
}
