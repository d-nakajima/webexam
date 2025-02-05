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
import HowToUseAnswerImage from "../HowToUseStepItem/how_to_use_answer.png";
import HowToUseRegisterImage from "../HowToUseStepItem/how_to_use_register.png";
import HowToUseReviewImage from "../HowToUseStepItem/how_to_use_review.png";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/app/_shadcn/components/ui/alert-dialog";
import { useState } from "react";
import HowToUseStepItem from "../HowToUseStepItem";

export default function HomeScreen() {
  const tValidation = useTranslations("validation.exam");
  const t = useTranslations("top");
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="my-20 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-5">{t("how_to_use.intro")}</h2>
        <h1 className="text-2xl font-bold mb-16 max-sm:text-2xl">
          {t("how_to_use.title")}
        </h1>
        <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">
          <HowToUseStepItem
            step="1"
            title={t("how_to_use.step1.title")}
            description={t("how_to_use.step1.description")}
            image={HowToUseRegisterImage}
          />
          <HowToUseStepItem
            step="2"
            title={t("how_to_use.step2.title")}
            description={t("how_to_use.step2.description")}
            image={HowToUseAnswerImage}
          />
          <HowToUseStepItem
            step="3"
            title={t("how_to_use.step3.title")}
            description={t("how_to_use.step3.description")}
            image={HowToUseReviewImage}
          />
        </div>
      </div>
      <form
        className="relative max-w-lg w-full"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <Input
            {...register("url")}
            placeholder={t("form.placeholder")}
            className="rounded-full p-5  border-2"
          />
          {errors.url && (
            <ErrorMessage className="absolute left-1/2 -translate-x-1/2">
              {tValidation(errors.url.message)}
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
