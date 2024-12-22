import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_shadcn/components/ui/dialog";
import { Input } from "@/app/_shadcn/components/ui/input";
import { Separator } from "@/app/_shadcn/components/ui/separator";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SearchDialog(props: Props) {
  const [text, setText] = useState("");
  const [result, _setResult] = useState<string[]>([]);
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="p-0 gap-0">
        <div className="p-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="キーワードで検索..."
            className="ring-0 focus-visible:ring-transparent outline-none border-none"
          />
        </div>
        <Separator />
        <div className="p-2 h-64">
          {text.length === 0 && (
            <div className="h-full flex items-center justify-center text-sm opacity-75 pb-6">
              キーワードを入力してください
            </div>
          )}
          {text.length > 0 && result.length === 0 && (
            <div className="h-full flex items-center justify-center text-sm opacity-75 pb-6">
              該当する結果が見つかりませんでした
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
