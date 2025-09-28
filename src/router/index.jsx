import App from "@/App";
import ErrorPage from "@/ErrorPage";
import Expense from "@/pages/expense/Expense";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      name: "Nayata",
      children: [
        {
          index: true,
          element: <Home />,
          name: "Home",
        },
        {
          path: "expense",
          element: <Expense />,
          name: "Expense",
        },
      ],
    },
  ],
  {
    basename: "/nayata",
  }
);

export default router;
