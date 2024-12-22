import { groupByFunc } from "@/app/_presets/_utils/array";
import { formatDate } from "date-fns";
import ExamSummaryListItem from "./ExamSummaryListItem";
import { Link } from "@/_lib/i18n/routing";

type Props = {
  items: {
    id: string;
    date: Date;
    title: string;
    url: string;
    score?: number;
  }[];
};
export default function ExamSummaryList(props: Props) {
  const dailyItems = groupByFunc(props.items, (item) =>
    formatDate(item.date, "yyyy-MM-dd")
  );

  return (
    <div className="flex flex-col gap-2">
      {dailyItems.map((dailyItem, index) => (
        <div className="" key={index}>
          <div className="px-2 text-xs font-bold">{dailyItem.group}</div>
          <div>
            {dailyItem.items.map((item) => (
              <Link href="#" key={item.id} className="px-2 py-[2px] block">
                <ExamSummaryListItem
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  score={item.score}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
