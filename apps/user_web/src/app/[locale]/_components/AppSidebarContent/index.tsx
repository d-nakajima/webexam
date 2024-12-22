import ExamSummaryList from "../ExamSummaryList";

export default async function AppSidebarContent() {
  return (
    <div className="flex flex-col items-stretch w-full h-full">
      <div className="flex-grow" />
      <ExamSummaryList
        items={[
          {
            id: "1",
            date: new Date(),
            title: "Exam 1",
            url: "/exam/1",
            score: 8.2,
          },
          {
            id: "2",
            date: new Date(),
            title: "Exam 2",
            url: "/exam/2",
            score: 5.3,
          },
          {
            id: "3",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            title: "Exam 3",
            url: "/exam/3",
            score: 6.8,
          },
        ]}
      />
    </div>
  );
}
