import { getVercelOrigin } from "@/app/_presets/_utils/url";
import { ImageResponse } from "next/og";
import { AnswerDataResponseType } from "./opengraph_data/type";
import { typedFetch } from "@/app/_presets/_utils/fetch";
import { answerRoutePath } from "@/app/_presets/_utils/route_builder";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: { locale: string; exam_id: string; answer_id: string };
};
export default async function Image(props: Props) {
  const answerDataUrl = `${getVercelOrigin()}/${
    props.params.locale
  }/${answerRoutePath(
    props.params.exam_id,
    props.params.answer_id
  )}/opengraph_data`;

  const answer = await typedFetch<AnswerDataResponseType>(answerDataUrl);
  const exam = answer.examData;
  const bgImageUrl = `${getVercelOrigin()}/ogp/share_bg.png`;
  let color: string;
  if (answer.score === undefined) {
    color = "gray";
  } else if (answer.score >= 8) {
    color = "green";
  } else if (answer.score >= 6) {
    color = "yellow";
  } else {
    color = "red";
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
          width: "1200px",
          height: "630px",
          padding: "100px 0",
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
            flexDirection: "column",
            color: "#CFCFCF",
            wordBreak: "keep-all",
          }}
        >
          <div>{exam.shortTitle}</div>
          <div
            style={{
              fontSize: "100px",
              color: color,
            }}
          >
            {answer.score?.toPrecision(2).substring(0, 3)}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
