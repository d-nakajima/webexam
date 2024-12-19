import AuthRouteWrapper from "@/app/_presets/_components/AuthRouteWrapper";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function AuthLayout(props: Props) {
  return <AuthRouteWrapper>{props.children}</AuthRouteWrapper>;
}
