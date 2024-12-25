// fetch関数に型を付けるための関数
export async function typedFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(input, init).then((res) => res.json());
}
