import axios from "axios";
import { useQuery } from "react-query";

interface Task {
  id: string;
  title: string;
  description: string;
}

const TaskList = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["taskList"],
    queryFn: async () => {
      const taskList = await axios.get("http://localhost:4000/tasks");
      return taskList.data;
    },
  });

  if (isLoading) {
    return <p className="text-center font-bold text-4xl mt-32">Loading....</p>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <h3>Task list</h3>
      <div className="lg:grid grid-cols-4 gap-10 space-y-6 lg:space-y-0">
        {tasks?.map((task: Task) => (
          <div key={tasks._id} className="bg-white p-4 rounded-md">
            <h3 className="font-semibold">{task?.title}</h3>
            <p>{task?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
