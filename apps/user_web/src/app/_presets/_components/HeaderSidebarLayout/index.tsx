import { Sidebar, SidebarProvider } from "@/app/_shadcn/components/ui/sidebar";

type Props = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

const HEADER_HEIGHT = "48px";
export default function HeaderSidebarLayout(props: Props) {
  return (
    <div
      className="w-screen"
      style={{
        // @ts-expect-error shadcnのやり方に従うが、型が不完全なためエラーが出る。
        "--sidebar-width": "272px",
        "--sidebar-width-mobile": "20rem",
        "--sidebar-width-collapsed": "64px",
        "--header-height": HEADER_HEIGHT,
      }}
    >
      <div
        className={`w-full shadow-sm fixed top-0 z-20 shadow-white bg-header h-[var(--header-height)]`}
      >
        {props.header}
      </div>
      <SidebarProvider className="flex">
        <Sidebar className="top-[--header-height] h-[calc(100%-var(--header-height))] z-10">
          {props.sidebar}
        </Sidebar>
        <div className="flex-grow mt-[var(--header-height)]">
          {props.children}
        </div>
      </SidebarProvider>
    </div>
  );
}
