import { getVercelProjectProductionOrigin } from "@/app/_presets/_utils/url";
import { ImageResponse } from "next/og";
import { ExamDataResponseType } from "./opengraph_data/type";
import { typedFetch } from "@/app/_presets/_utils/fetch";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: { locale: string; exam_id: string };
};
export default async function Image(props: Props) {
  const examDataUrl = `${getVercelProjectProductionOrigin()}/${
    props.params.locale
  }${examRoutePath(props.params.exam_id)}opengraph_data`;

  const exam = await typedFetch<ExamDataResponseType>(examDataUrl);
  const bgImageUrl = `${getVercelProjectProductionOrigin()}/ogp/share_bg.png`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            fontWeight: "bold",
            height: "100%",
            width: "530px",
            fontSize: "50px",
            display: "flex",
            alignItems: "center",
            color: "#CFCFCF",
            wordBreak: "keep-all",
          }}
        >
          {exam?.shortTitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
