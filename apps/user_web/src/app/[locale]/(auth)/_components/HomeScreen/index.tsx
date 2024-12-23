"use client";
import {
  createExam,
  listenExam,
} from "@/app/_presets/_repositories/clientFirestore";
import { Button } from "@/app/_shadcn/components/ui/button";
import { Input } from "@/app/_shadcn/components/ui/input";
import { ExamSchema } from "@/app/_shared";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "use-intl";
import ErrorMessage from "@/app/_presets/_components/ErrorMessage";
import { useRouter } from "@/_lib/i18n/routing";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import ReactLoading from "react-loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/app/_shadcn/components/ui/alert-dialog";
import { useState } from "react";

export default function HomeScreen() {
  const t = useTranslations("validation.exam");
  const { push } = useRouter();
  const ExamCreateSchema = ExamSchema.pick({ url: true });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<typeof ExamCreateSchema._type>({
    resolver: zodResolver(ExamCreateSchema),
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const submit = async (data: typeof ExamCreateSchema._type) => {
    const { id } = await createExam(data.url);
    listenExam(id, (exam) => {
      if (!exam) console.error("Exam not found");
      if (exam.status === "created") {
        push(examRoutePath(id));
      } else {
        setIsGenerating(true);
      }
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="relative max-w-lg w-full"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <Input
            {...register("url")}
            placeholder="理解度テストを作成する記事のURLを入力してください......"
            className="rounded-full p-5"
          />
          {errors.url && (
            <ErrorMessage className="absolute left-1/2 -translate-x-1/2">
              {t(errors.url.message)}
            </ErrorMessage>
          )}
        </div>
        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
          size="icon"
          variant="default"
          disabled={!isValid || isSubmitting}
        >
          <SendIcon />
        </Button>
      </form>
      <AlertDialog open={isGenerating}>
        <AlertDialogContent>
          <AlertDialogTitle>テストを生成しています...</AlertDialogTitle>
          <div className="text-xs">
            生成後、自動でテストページに遷移します。少々お待ちください...
          </div>
          <div className="flex justify-center my-10">
            <ReactLoading type="bars" color="white" />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
