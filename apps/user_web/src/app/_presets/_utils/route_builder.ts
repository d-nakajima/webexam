export function homeRoutePath() {
  return "/home";
}

export function examRoutePath(id: string) {
  return `/exam/${id}`;
}

export function answerRoutePath(examId: string, id: string) {
  return `/exam/${examId}/answer/${id}`;
}
