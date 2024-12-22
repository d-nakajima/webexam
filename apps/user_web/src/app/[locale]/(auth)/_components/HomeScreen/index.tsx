import { Button } from "@/app/_shadcn/components/ui/button";
import { Input } from "@/app/_shadcn/components/ui/input";
import { SendIcon } from "lucide-react";

export default function HomeScreen() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative max-w-lg w-full">
        <Input
          placeholder="理解度テストを作成する記事のURLを入力してください......"
          className="rounded-full p-5"
        />
        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
          size="icon"
          variant="default"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
