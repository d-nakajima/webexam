import AuthRouteWrapper from "@/app/_presets/_components/AuthRouteWrapper";
import HeaderSidebarLayout from "@/app/_presets/_components/HeaderSidebarLayout";
import { ReactNode } from "react";
import AppSidebarContent from "../_components/AppSidebarContent";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function AuthLayout(props: Props) {
  return (
    <AuthRouteWrapper>
      <HeaderSidebarLayout header={<Header />} sidebar={<AppSidebarContent />}>
        {props.children}
      </HeaderSidebarLayout>
    </AuthRouteWrapper>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-full px-4">
      Header
    </header>
  );
}
