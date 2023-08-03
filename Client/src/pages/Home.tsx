import { Toaster } from "react-hot-toast";
import InputField from "../components/InputField";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div>
      <InputField />
      <TaskList />
      <Toaster position="top-center" />
    </div>
  );
};

export default Home;
