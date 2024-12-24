import ShareButtons from "@/app/_presets/_components/SnsShareButtons";
import { homeRoutePath } from "@/app/_presets/_utils/route_builder";
import { DialogTitle } from "@/app/_shadcn/components/ui/dialog";

export default function HomeShareDialogContent() {
  return (
    <>
      <DialogTitle>アプリをシェア</DialogTitle>
      <div className="p-2 text-center">
        このアプリを友達にシェアしてみましょう
      </div>
      <div>
        <ShareButtons path={homeRoutePath()} />
      </div>
    </>
  );
}
