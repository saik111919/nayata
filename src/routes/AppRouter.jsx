import { Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello</div>}></Route>
    </Routes>
  );
};

export default AppRouter;
