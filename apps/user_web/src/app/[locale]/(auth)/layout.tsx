import AuthRouteWrapper from "@/app/_presets/_components/AuthRouteWrapper";
import HeaderSidebarLayout from "@/app/_presets/_components/HeaderSidebarLayout";
import { ReactNode } from "react";
import AppSidebarContent from "../_components/AppSidebarContent";
import SidebarTop from "../_components/PageHeader/SidebarTop";
import UserAnswersProvider from "./_providers/UserAnswersProvider";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function AuthLayout(props: Props) {
  return (
    <AuthRouteWrapper>
      <UserAnswersProvider>
        <HeaderSidebarLayout
          header={<SidebarTop />}
          sidebar={<AppSidebarContent />}
        >
          {props.children}
        </HeaderSidebarLayout>
      </UserAnswersProvider>
    </AuthRouteWrapper>
  );
}
