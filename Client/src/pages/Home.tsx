import axios from "axios";
import { SyntheticEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const inpRef = useRef<HTMLFormElement>(null);
  const handleAddTask = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };
    const task = {
      title: target.title.value,
      description: target.description.value,
      completed: false,
      important: false,
    };
    try {
      const response = await axios.post("http://localhost:4000/tasks", task);
      console.log(response.data);
      if (response.data.acknowledged) {
        toast.success("Task added successfully!");
      }
    } catch (error: any) {
      toast.error("Failed to fetch:- ", error);
    }
  };
  return (
    <div>
      <form
        ref={inpRef}
        onSubmit={handleAddTask}
        className="bg-white w-1/2 mx-auto mt-32 p-6 rounded-sm flex flex-col font-bold text-lg gap-2 "
      >
        <label
          htmlFor="task"
          className="text-3xl text-center font-bold text-green-500 mb-4"
        >
          Add a new Task
        </label>
        <input
          id="task"
          type="text"
          name="title"
          placeholder="What is in your mind?"
          className="border py-2 px-3 text-sm focus:outline-none border-green-500 focus:border-2 rounded-md font-normal"
        />
        <textarea
          name="description"
          className="border py-2 px-3 text-sm border-green-500 focus:outline-none focus:border-2 rounded-md font-normal"
          cols={30}
          rows={3}
          placeholder="Add something"
        ></textarea>
        <input
          type="submit"
          value="Add"
          className="bg-green-500 w-40 mx-auto py-2 mt-6 rounded-md hover:bg-green-400 duration-300 cursor-pointer uppercase text-white"
        />
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default Home;
