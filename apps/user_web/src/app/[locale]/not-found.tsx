import { Link } from "@/_lib/i18n/routing";
import { Button } from "../_shadcn/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="my-10 text-center">
        <div className="text-5xl">404</div>
        <div className="text-2xl">Not Found</div>
      </div>
      <Link href="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
}
