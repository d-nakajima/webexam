export function getGradeIconFromScore(score: number) {
  if (score === 0) {
    return "❌";
  } else if (score === 10) {
    return "✅";
  } else {
    return "⚠️";
  }
}

export type GradeText = "correct" | "wrong" | "partial";
export function getGradeIcon(grade: GradeText) {
  switch (grade) {
    case "correct":
      return "✅";
    case "wrong":
      return "❌";
    case "partial":
      return "⚠️";
  }
}

export function getGradeIconFromRate(rate: number) {
  if (rate === 0) {
    return "❌";
  } else if (rate === 1) {
    return "✅";
  } else {
    return "⚠️";
  }
}
