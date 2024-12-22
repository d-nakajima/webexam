import ShareButtons from "@/app/_presets/_components/SnsShareButtons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_shadcn/components/ui/dialog";

type Props = {
  children: React.ReactNode;
};

export default async function HomeShareDialog(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>アプリをシェア</DialogTitle>
        <div className="p-2 text-center">
          このアプリを友達にシェアしてみましょう
        </div>
        <div>
          <ShareButtons url="https://google.com" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
