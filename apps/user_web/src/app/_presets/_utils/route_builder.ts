export function homeRoutePath() {
  return "/";
}

export function examRoutePath(id: string) {
  return `/exam/${id}`;
}

export function answerRoutePath(examId: string, id: string) {
  return `/exam/${examId}/${id}`;
}
