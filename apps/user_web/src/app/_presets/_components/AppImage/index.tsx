import { cn } from "@/_lib/shadcn/utils";
import Image, { ImageProps } from "next/image";

type Props = {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
} & ImageProps;

export type AppImageProps = Props;
export default function AppImage(props: Props) {
  const { src, alt, height, width, className, sizes, loader } = props;

  return (
    <Image
      loader={loader}
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={cn(className, "object-cover")}
      sizes={sizes ?? "100vw"}
    />
  );
}
