import AppImage from "@/app/_presets/_components/AppImage";
import { StaticImageData } from "next/image";

type Props = {
  step: string;
  title: string;
  description: string;
  image: StaticImageData;
};

export default function HowToUseStepItem(props: Props) {
  return (
    <div className="flex flex-col items-center border rounded-md p-5 max-w-60 w-1/3 min-w-52 max-sm:flex-row max-sm:gap-5 max-sm:max-w-full max-sm:w-full max-sm:p-3 max-sm:justify-between">
      <div className="flex flex-col items-center gap-2 max-sm:gap-1 max-sm:items-start">
        <h3 className="text-md font-bold">
          {props.step}. {props.title}
        </h3>
        <p className="text-xs">{props.description}</p>
      </div>
      <AppImage className="w-20" {...props.image} alt={props.title} />
    </div>
  );
}
