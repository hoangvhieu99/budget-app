// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Header from "../components/Header";

const Main = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};
export default Main;
