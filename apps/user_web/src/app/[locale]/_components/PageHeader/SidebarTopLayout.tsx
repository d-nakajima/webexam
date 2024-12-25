"use client";

import { useSidebar } from "@/app/_shadcn/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function SidebarTopLayout(props: Props) {
  const { open, isMobile } = useSidebar();

  return (
    <div
      className="flex items-center h-full transition-all ease-linear md:w-[var(--sidebar-width)]"
      style={{
        width:
          isMobile || !open ? "var(--sidebar-top-collapse-width)" : undefined,
      }}
    >
      {props.children}
    </div>
  );
}
