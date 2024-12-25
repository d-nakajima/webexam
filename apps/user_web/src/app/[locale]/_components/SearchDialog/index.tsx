import { cacheListUserAnswers } from "@/app/_presets/_utils/cache";
import SearchDialogContent from "./SearchDialogContent";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";

type Props = {
  children: React.ReactNode;
};

export default async function SearchDialog(props: Props) {
  const authUser = await getServerAuthUser();
  if (!authUser) throw new Error("User is not authenticated");

  const cache = cacheListUserAnswers(authUser.uid);
  const allAnswers = await cache(authUser.uid);

  return (
    <SearchDialogContent allAnswers={allAnswers}>
      {props.children}
    </SearchDialogContent>
  );
}
