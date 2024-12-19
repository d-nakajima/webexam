import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};
export default function SimpleLayout(props: Props) {
  return <div>{props.children}</div>;
}
