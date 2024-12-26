import { Link } from "@/_lib/i18n/routing";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import { Button } from "@/app/_shadcn/components/ui/button";
import { ShieldAlertIcon } from "lucide-react";

type Props = {
  examId: string;
};
export default function PrivateAnswerAlert(props: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
      <ShieldAlertIcon size={64} />
      <div className="text-white font-semibold my-4">
        このページは回答者によって非公開に設定されています
      </div>
      <Link href={examRoutePath(props.examId)}>
        <Button>問題に回答する</Button>
      </Link>
    </div>
  );
}
