import { HeaderSection } from "./HeaderSection";
import { StatCardsSection } from "./StatCardsSection";
import { ChartSection } from "./ChartSection";
import { TableSection } from "./TableSection";

export const DashboardView = () => {
  return (
    <div className="grid w-full gap-6 my-[2rem] lg:w-[90%] lg:mx-auto lg:my-[4rem]">
      <HeaderSection />
      <StatCardsSection />
      <ChartSection />
      <TableSection />
    </div>
  );
};
