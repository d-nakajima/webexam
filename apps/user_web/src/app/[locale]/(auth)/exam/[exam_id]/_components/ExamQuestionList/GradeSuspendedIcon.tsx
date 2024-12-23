"use client";

import ReactLoading from "react-loading";
import { getGradeIconFromRate } from "../../_utils/getGradeIcon";

type Props = {
  gradeRate?: number;
};

export default function GradeSuspendedIcon(props: Props) {
  return props.gradeRate === undefined ? (
    <ReactLoading type="spin" color="white" height={14} width={14} />
  ) : (
    getGradeIconFromRate(props.gradeRate)
  );
}
