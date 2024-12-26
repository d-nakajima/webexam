import ShareButtons from "@/app/_presets/_components/SnsShareButtons";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import { DialogTitle } from "@/app/_shadcn/components/ui/dialog";

type Props = {
  id: string;
};

export default function ExamShareDialogContent(props: Props) {
  return (
    <>
      <DialogTitle>問題をシェア</DialogTitle>
      <div className="p-2 text-center">
        問題を友達に共有して、一緒に解くことができます
      </div>
      <div>
        <ShareButtons path={examRoutePath(props.id)} />
      </div>
    </>
  );
}
