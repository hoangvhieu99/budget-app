import { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import DashboardChart from "../components/Dashboard/DashboardChart";
import Incomes from "../components/Incomes/Incomes";
import Expenses from "../components/Expenses/Expenses";

export default function Dashboard() {
  const [active, setActive] = useState(1);
  const displayData = () => {
    switch (active) {
      case 1:
        return <DashboardChart />;
      case 2:
        return <DashboardChart />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <DashboardChart />;
    }
  };
  return (
    <div className="body-dashboard">
      <div className="main-layout">
        <Navigation active={active} setActive={setActive} />
        <div className="column-right">{displayData()}</div>
      </div>
    </div>
  );
}
