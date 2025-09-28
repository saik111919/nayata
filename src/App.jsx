import { Outlet } from "react-router";
import "./App.css";
import Layout from "@/layout/Layout";

const App = () => {
  return (
    <div className="flex flex-col">
      <Layout />
      <main className="page-main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
