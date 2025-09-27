import App from "@/App";
import ThemeDemo from "@/components/ThemeDemo";
import ErrorPage from "@/ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/nayata",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "theme",
        element: <ThemeDemo />,
      },
    ],
  },
]);

export default router;
