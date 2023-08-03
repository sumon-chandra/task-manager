import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import CompletedTasks from "./pages/CompletedTasks";
import ImportantTasks from "./pages/ImportantTasks";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="important" element={<ImportantTasks />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
