import { Link, Outlet } from "react-router";
import "./App.css";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { setColor } = useTheme();
  return (
    <>
      <Link to="/nayata/theme">Theme Demo</Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="color"
          name=""
          id=""
          onChange={(e) => setColor(e.target)}
        />
        <div
          style={{
            backgroundColor: "var(--surface-color)",
            padding: "20px",
            borderRadius: "8px",
            height: "100px",
            width: "100px",
          }}
        >
          Hello
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default App;
